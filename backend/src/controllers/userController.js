import mongoose from 'mongoose';
import {
  getProfileService,
  getUsersProfileService,
  getAllUserProfileService,
  updateProfileService,
  changePasswordService,
} from '../services/userService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getProfile = asyncHandler(async (req, res) => {
  const user = await getProfileService(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
});

export const getUsersProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID.',
    });
  }

  const user = await getUsersProfileService(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
});

export const getAllUserProfile = asyncHandler(async (req, res) => {
  const users = await getAllUserProfileService();

  res.status(200).json({
    success: true,
    data: users,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({
      success: false,
      message: 'Username and email are required.',
    });
  }

  const formattedEmail = email.trim().toLowerCase();

  if (username.length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Username must be at least 3 characters.',
    });
  }

  if (!formattedEmail.endsWith('@gmail.com')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format.',
    });
  }

  const user = await updateProfileService(req.user.id, {
    username: username.trim(),
    email: formattedEmail,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Current password and new password are required',
    });
  }

  if (newPassword.length < 5) {
    return res.status(400).json({
      success: false,
      message: 'Please use a stronger password.',
    });
  }

  if (currentPassword.trim() === newPassword.trim()) {
    return res.status(400).json({
      success: false,
      message: 'New password must be different from current password.',
    });
  }

  const result = await changePasswordService(
    req.user.id,
    currentPassword,
    newPassword,
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Password changed successfully.',
  });
});
