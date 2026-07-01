import Note from '../models/WallifyNote.js';

export const createNoteService = async ({ title, content, owner }) => {
  const note = await Note.create({
    title,
    content,
    owner,
  });

  return note;
};
