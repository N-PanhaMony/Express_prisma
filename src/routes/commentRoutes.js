import express from 'express';
import { getAllComments , createComment } from '../Controllers/commentController.js';

const router = express.Router();

router.get('/', getAllComments);
router.post('/', createComment);

export default router;