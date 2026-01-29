import express from 'express';
import { getAllTags, createTag } from '../Controllers/tagController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all tags (public)
router.get('/', getAllTags);

// POST create tag (requires auth)
router.post('/', authMiddleware, createTag);

export default router;
