import bcrypt from 'bcrypt';
import User from '../models/WallifyUser.js';

export const getProfileService = async (id) => {
  const user = await User.findById(id).select('-password');

  return user;
};

export const getUsersProfileService = async (id) => {
  const user = await User.findById(id).select('username role');

  return user;
};

export const getAllUserProfileService = async () => {
  const users = await User.find().sort().select('-email -password');

  return users;
};

export const updateProfileService = async (userId, updateData) => {
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  const existingUser = await User.findOne({
    email: updateData.email,
    _id: { $ne: userId },
  });

  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  user.username = updateData.username;
  user.email = updateData.email;

  await user.save();

  return user;
};

export const changePasswordService = async (
  userId,
  currentPassword,
  newPassword,
) => {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new Error('INVALID_PASSWORD');
  }

  user.password = newPassword;
  await user.save();

  return user;
};
