import api from './api';

export const createNote = async (noteData) => {
  const response = await api.post('/note', noteData);

  return response.data;
};

export const getAllNotes = async () => {
  const response = await api.get('/note');

  return response.data;
};
