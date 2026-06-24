import { Ratelimit } from '@upstash/ratelimit';
import redis from '../config/upstash.js';

export const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true,
});

export const notesLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
});

export const userProfileLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1m'),
  analytics: true,
});

export const rateLimit = (limiter) => {
  return async (req, res, next) => {
    try {
      const identifier = req.user?.id || req.ip;
      const { success } = await limiter.limit(identifier);
      if (!success) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests. Please try again later.',
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
