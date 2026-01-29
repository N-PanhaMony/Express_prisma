import express from 'express';
import { getAllComments, createComment } from '../Controllers/commentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all comments (public)
router.get('/', getAllComments);

// POST comment (requires auth)
router.post('/', authMiddleware, createComment);

export default router;
