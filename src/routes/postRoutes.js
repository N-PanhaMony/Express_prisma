import express from 'express';
import { getAllPosts, createPost , deletePost } from '../Controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createPostSchema } from '../validator/postValidator.js';

const router = express.Router();

router.use(authMiddleware)

// GET /posts → all posts
router.get('/', getAllPosts);

// POST /posts → create post
router.post('/',validateRequest(createPostSchema), createPost);

// DELETE /posts/:id → delete post
router.delete('/:id', deletePost);

export default router;
