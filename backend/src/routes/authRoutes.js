import express from 'express';
import { authLimiter, rateLimit } from '../middleware/rateLimiter.js';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', rateLimit(authLimiter), register);
router.post('/login', rateLimit(authLimiter), login);
router.post('/logout', rateLimit(authLimiter), logout);

export default router;
