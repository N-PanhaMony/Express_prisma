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
  const { title, content, published = false, authorId, tagIds = [] } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        content,
        published,
        authorId,
        tags: { create: tagIds.map(tagId => ({ tagId })) },
      },
      include: { tags: { include: { tag: true } } },
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
};