import mongoose from 'mongoose';

const wallifyNoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trime: true,
    },
  },
  { timestamps: true },
);

const Note = mongoose.model('WallifyNote', wallifyNoteSchema);

export default Note;
