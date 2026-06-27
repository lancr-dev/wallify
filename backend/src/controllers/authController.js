import User from '../models/WallifyUser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
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

    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Please use a strong password.',
      });
    }

    const existingUser = await User.findOne({
      email: formattedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists.',
      });
    }

    const user = await User.create({
      username,
      email: formattedEmail,
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
      message: `Error in register controller: ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Account login successfully.',
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
      message: `Error in login controller: ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  return res.status(200).json({
    success: true,
    message: 'Account logout successfully.',
  });
};
