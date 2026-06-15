import express from 'express';
import { createNote, getAllNotes } from '../controllers/notesController.js';

const router = express.Router();

router.post('/create', createNote);
router.get('/', getAllNotes);

export default router;
