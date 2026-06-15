import Note from '../models/WallifyNote.js';

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and Content are required.',
      });
    }

    const note = await Note.create({
      title,
      content,
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
