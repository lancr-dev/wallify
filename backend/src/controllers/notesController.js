import Note from '../models/WallifyNote.js';
import { createNoteService } from '../services/notesService.js';

export const createNote = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in createNote controller: ${error.message}`,
    });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in getAllNotes controller: ${error.message}`,
    });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in getNote controller: ${error.message};`,
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and Content are required.',
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found.',
      });
    }

    if (note.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden.',
      });
    }

    note.title = title ?? note.title;
    note.content = content ?? note.content;

    await note.save();

    return res.status(200).json({
      success: true,
      message: 'Wallify updated successfully.',
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in updateNote controller: ${error.message}`,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found.',
      });
    }

    if (!note.owner.equals(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden.',
      });
    }

    await note.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Note deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in deleteNote controller: ${error.message}`,
    });
  }
};
