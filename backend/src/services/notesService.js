import Note from '../models/WallifyNote.js';

export const createNoteService = async ({ title, content, owner }) => {
  const note = await Note.create({
    title,
    content,
    owner,
  });

  return await note.populate('owner', 'username role');
};

export const getAllNotesService = async () => {
  const notes = await Note.find()
    .populate('owner', 'username role')
    .sort({ createdAt: -1 });

  return notes;
};

export const getNoteService = async (id) => {
  const note = await Note.findById(id).populate('owner', 'username role');

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

  return await note.populate('owner', 'username role');
};

export const deleteNoteService = async (id, currentUser) => {
  const note = await Note.findById(id);

  if (!note) {
    return null;
  }

  if (!note.owner.equals(currentUser.id) && currentUser.role !== 'admin') {
    throw new Error('FORBIDDEN.');
  }

  await note.deleteOne();

  return note;
};

/* 
Applying DRY principle:
export const findNoteByIdService = async (id) => {
  return await Note.findById(id);
}; 
*/
