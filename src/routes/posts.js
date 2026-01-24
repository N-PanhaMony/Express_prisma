import express from 'express';
import { prisma } from '../config/prisma.js';

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true, // 👈 optional but useful
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new post
router.post('/', async (req, res) => {
  const { title, content, authorId } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId, // 👈 REQUIRED
      },
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
