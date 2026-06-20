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
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WallifyUser',
      required: true,
    },
  },
  { timestamps: true },
);

const Note = mongoose.model('WallifyNote', wallifyNoteSchema);

export default Note;
