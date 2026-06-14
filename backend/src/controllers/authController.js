import bcrypt from 'bcrypt';
import User from '../models/WallifyUser.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists.',
      });
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in register Controller: ${error.message}`,
    });
  }
};
