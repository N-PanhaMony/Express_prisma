import express from 'express';
import { prisma } from '../config/prisma.js';

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new post
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
