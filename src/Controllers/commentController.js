import { prisma } from '../config/prisma.js';

// Get all comments (public)
export const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        post: true,
        user: true,
      },
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new comment (requires login)
export const createComment = async (req, res) => {
  const { content, postId } = req.body;

  if (!content || !postId) {
    return res.status(400).json({ message: "content and postId are required" });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId: req.user.id, // ✅ authenticated user's ID
      },
      include: {
        user: true,
        post: true,
      },
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Error creating comment" });
  }
};