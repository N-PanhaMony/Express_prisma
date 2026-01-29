import { prisma } from "../config/prisma.js";

// Helper: include related data for posts
const postInclude = {
  author: true,
  tags: { include: { tag: true } },
  comments: { include: { user: true } },
};

// GET all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ include: postInclude });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// CREATE new post
export const createPost = async (req, res) => {
  const { title, content, published = false, tagIds = [] } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        content,
        published,
        authorId: req.user.id, // use logged-in user ID
        tags: tagIds.length
          ? {
              create: tagIds.map(tagId => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: postInclude,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Error creating post" });
  }
};

// DELETE a post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) return res.status(404).json({ message: "Post not found" });

    if (existingPost.authorId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    // Delete related PostTag records
    await prisma.postTag.deleteMany({ where: { postId: id } });

    // Delete related Comments
    await prisma.comment.deleteMany({ where: { postId: id } });

    // Now delete the post
    await prisma.post.delete({ where: { id } });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Error deleting post" });
  }
};

