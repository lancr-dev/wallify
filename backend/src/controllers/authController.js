import asyncHandler from '../utils/asyncHandler.js';
import { registerService, loginService } from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
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

  const user = await registerService({
    username: username.trim(),
    email: formattedEmail,
    password,
  });

  return res.status(201).json({
    success: true,
    message: 'Account registered successfully.',
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  const { user, token } = await loginService({
    email: email.trim().toLowerCase(),
    password,
  });

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
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  return res.status(200).json({
    success: true,
    message: 'Account logout successfully.',
  });
});
