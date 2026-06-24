import express from 'express';
import {
  authLimiter,
  userProfileLimiter,
  rateLimit,
} from '../middleware/rateLimiter.js';
import {
  getProfile,
  getUsersProfile,
  updateProfile,
  changePassword,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', rateLimit(userProfileLimiter), protect, getUsersProfile);

router.get('/', rateLimit(userProfileLimiter), protect, getProfile);
router.put('/update', rateLimit(authLimiter), protect, updateProfile);
router.put('/change-password', rateLimit(authLimiter), protect, changePassword);

export default router;
