const rateLimit = require('express-rate-limit');

// Limit IP to 5 requests per 15 minutes for contact submissions to prevent spamming
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many submissions from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in standard headers
  legacyHeaders: false, // Disable old legacy headers
});

module.exports = contactLimiter;
