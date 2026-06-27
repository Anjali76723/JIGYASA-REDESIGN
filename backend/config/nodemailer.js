const nodemailer = require('nodemailer');

// Set up transporter dynamically using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT, 10) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Verifies the connection configuration with SMTP server.
 * Useful for debugging configuration during startup.
 */
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('SMTP server connection verified successfully.');
    return true;
  } catch (error) {
    console.error('SMTP server connection verification failed:', error.message);
    return false;
  }
};

module.exports = {
  transporter,
  verifyTransporter,
};
