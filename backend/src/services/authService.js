import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/WallifyUser.js';

export const registerService = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  return user;
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  return {
    user,
    token,
  };
};
