import bcrypt from 'bcrypt';
import User from '../models/WallifyUser.js';
import mongoose from 'mongoose';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

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

    const user = await User.findById(id).select('username role');

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
        message: 'Username characters must be at least 3.',
      });
    }

    if (!formattedEmail.endsWith('@gmail.com')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format.',
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const existingUser = await User.findOne({ email: formattedEmail });

    if (existingUser && existingUser._id.toString() !== req.user.id) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists.',
      });
    }

    user.username = username.trim();
    user.email = formattedEmail;

    await user.save();

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

    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Please use a strong password.',
      });
    }

    if (currentPassword.trim() === newPassword.trim()) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password.',
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect.',
      });
    }

    user.password = newPassword;

    await user.save();

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
