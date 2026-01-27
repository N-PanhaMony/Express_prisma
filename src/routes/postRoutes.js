import express from 'express';
import { getAllPosts, createPost } from '../Controllers/postController.js';

const router = express.Router();

// GET /posts → all posts
router.get('/', getAllPosts);

// POST /posts → create post
router.post('/', createPost);

export default router;
