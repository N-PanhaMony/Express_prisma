import express from 'express'
import { getAllTags, createTag } from '../Controllers/tagController.js'

const router = express.Router();

router.get('/', getAllTags);
router.post('/', createTag);

export default router;