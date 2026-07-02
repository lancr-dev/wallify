import User from '../models/WallifyUser.js';

export const getProfileService = async (id) => {
  const user = await User.findById(id).select('-password');

  return user;
};

export const getUsersProfileService = async (id) => {
  const user = await User.findById(id).select('username role');

  return user;
};
