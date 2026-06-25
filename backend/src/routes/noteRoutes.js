import express from 'express';
import { notesLimiter, rateLimit } from '../middleware/rateLimiter.js';
import {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', rateLimit(notesLimiter), protect, createNote);
router.get('/', rateLimit(notesLimiter), getAllNotes);

router.get('/:id', rateLimit(notesLimiter), getNote);
router.put('/:id', rateLimit(notesLimiter), protect, updateNote);
router.delete('/:id', rateLimit(notesLimiter), protect, deleteNote);

export default router;
