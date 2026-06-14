import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const wallifyUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

wallifyUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('WallifyUser', wallifyUserSchema);

export default User;
