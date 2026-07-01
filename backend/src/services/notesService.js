import Note from '../models/WallifyNote.js';

export const createNoteService = async ({ title, content, owner }) => {
  const note = await Note.create({
    title,
    content,
    owner,
  });

  return note;
};

export const getAllNotesService = async () => {
  const notes = await Note.find().sort({ createdAt: -1 });

  return notes;
};
