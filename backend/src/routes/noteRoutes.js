import express from 'express';
import {
  createNote,
  getAllNotes,
  getNote,
} from '../controllers/notesController.js';

const router = express.Router();

router.post('/create', createNote);
router.get('/', getAllNotes);

router.get('/:id', getNote);

export default router;
