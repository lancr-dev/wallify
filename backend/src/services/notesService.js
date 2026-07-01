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

export const getNoteService = async (id) => {
  const note = await Note.findById(id);

  return note;
};

export const updateNoteService = async (id, title, content, currentUser) => {
  const note = await Note.findById(id);

  if (!note) {
    return null;
  }

  if (!note.owner.equals(currentUser.id) && currentUser.role !== 'admin') {
    throw new Error('FORBIDDEN.');
  }

  note.title = title;
  note.content = content;

  await note.save();

  return note;
};

export const deleteNoteService = async (id) => {
  const note = await Note.findById(id);

  return note;
};

/* 
Applying DRY principle:
export const findNoteByIdService = async (id) => {
  return await Note.findById(id);
}; 
*/
