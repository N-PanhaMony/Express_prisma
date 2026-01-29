import express from 'express';
import { getAllPosts, createPost } from '../Controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware)

// GET /posts → all posts
router.get('/', getAllPosts);

// POST /posts → create post
router.post('/', createPost);

export default router;
