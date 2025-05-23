const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 requests per window per IP
  message: "Too many login attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter };
