import {
  createNoteService,
  getAllNotesService,
  getNoteService,
  updateNoteService,
  deleteNoteService,
} from '../services/notesService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Title and Content are required.',
    });
  }

  const note = await createNoteService({
    title,
    content,
    owner: req.user.id,
  });

  return res.status(201).json({
    success: true,
    data: note,
  });
});

export const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await getAllNotesService();

  return res.status(200).json({
    success: true,
    data: notes,
  });
});

export const getNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await getNoteService(id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found.',
    });
  }

  return res.status(200).json({
    success: true,
    data: note,
  });
});

export const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Title and Content are required.',
    });
  }

  const note = await updateNoteService(id, title, content, req.user);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Wallify updated successfully.',
    data: note,
  });
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await deleteNoteService(id, req.user);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Note deleted successfully.',
  });
});
