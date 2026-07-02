import bcrypt from 'bcrypt';
import User from '../models/WallifyUser.js';
import mongoose from 'mongoose';
import {
  getProfileService,
  getUsersProfileService,
  getAllProfileService,
  updateProfileService,
  changePasswordService,
} from '../services/userService.js';

export const getProfile = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in getProfile controller: ${error.message}`,
    });
  }
};

export const getUsersProfile = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in getUsersProfile controller: ${error.message}`,
    });
  }
};

export const getAllUserProfile = async (req, res) => {
  try {
    const users = await getAllProfileService();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in getAllUserProfile controller: ${error.message}`,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
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
        name: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.message === 'EMAIL_EXISTS') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists.',
      });
    }

    return res.status(500).json({
      success: false,
      message: `Error in updateProfile controller: ${error.message}`,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
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

    try {
      await changePasswordService(req.user.id, currentPassword, newPassword);
    } catch (error) {
      if (error.message === 'INVALID_PASSWORD') {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect.',
        });
      }
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in changePassword controller: ${error.message}`,
    });
  }
};
