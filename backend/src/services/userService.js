import User from '../models/WallifyUser.js';

export const getProfileService = async (id) => {
  const user = await User.findById(id).select('-password');

  return user;
};
