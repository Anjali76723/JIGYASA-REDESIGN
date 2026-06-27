const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const validateContactRequest = require('../middlewares/validation');
const contactLimiter = require('../middlewares/rateLimiter');

// POST /api/contact - handles form submissions with security rate limiter and fields validation
router.post('/contact', contactLimiter, validateContactRequest, contactController.handleContactSubmission);

module.exports = router;
