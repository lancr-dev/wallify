import express from 'express';
import {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
} from '../controllers/notesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createNote);
router.get('/', getAllNotes);

router.get('/:id', getNote);
router.put('/:id', protect, updateNote);

export default router;
