/**
 * Helper to strip HTML tags to prevent HTML injection and XSS.
 * Trims leading/trailing whitespace.
 */
const sanitizeString = (val) => {
  if (typeof val !== 'string') return '';
  return val.replace(/<[^>]*>/g, '').trim();
};

/**
 * Middleware to validate and sanitize contact form submission requests.
 */
const validateContactRequest = (req, res, next) => {
  const { name, email, phone, service, message, sourcePage } = req.body;

  // Sanitize all inputs in the body
  req.body.name = sanitizeString(name);
  req.body.email = typeof email === 'string' ? email.trim().toLowerCase() : '';
  req.body.phone = typeof phone === 'string' ? sanitizeString(phone) : '';
  req.body.service = typeof service === 'string' ? sanitizeString(service) : '';
  req.body.message = sanitizeString(message);
  req.body.sourcePage = typeof sourcePage === 'string' ? sanitizeString(sourcePage) : '';

  const errors = [];

  // Validation checks
  if (!req.body.name) {
    errors.push('Name is required.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!req.body.email) {
    errors.push('Email is required.');
  } else if (!emailRegex.test(req.body.email)) {
    errors.push('Please enter a valid email address.');
  }

  // Validate phone number length if provided
  if (req.body.phone) {
    const rawDigits = req.body.phone.replace(/\D/g, '');
    if (rawDigits.length < 7 || rawDigits.length > 15) {
      errors.push('Phone number must contain between 7 and 15 digits.');
    }
  }

  if (!req.body.service) {
    errors.push('Interested Service is required.');
  }

  if (!req.body.message) {
    errors.push('Message is required and cannot be empty.');
  } else if (req.body.message.length < 15) {
    errors.push('Message must be at least 15 characters long.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors,
    });
  }

  next();
};

module.exports = validateContactRequest;
