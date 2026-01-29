import { prisma } from '../config/prisma.js';

export const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        post: true,
        user: true, // 👈 useful
      },
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createComment = async (req, res) => {
  const { content, postId, userId } = req.body;

  if (!content || !postId || !userId) {
    return res.status(400).json({
      message: 'content, postId, and userId are required',
    });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
