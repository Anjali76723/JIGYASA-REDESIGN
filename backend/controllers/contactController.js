const emailService = require('../services/emailService');

/**
 * Controller to handle contact form submissions.
 */
const handleContactSubmission = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // 1. Send the primary inquiry notification to the administrator
    try {
      await emailService.sendInquiryEmail(req.body);
    } catch (inquiryError) {
      console.error('[SMTP Admin Error]: Failed to send inquiry notification:', inquiryError);
      return res.status(502).json({
        success: false,
        error: 'SMTP delivery failure: Could not transmit your inquiry. Please verify server settings or try again.',
      });
    }

    // 2. Send the auto-reply confirmation to the client (graceful fallback)
    try {
      await emailService.sendAutoReplyEmail(name, email);
    } catch (replyError) {
      // If auto-reply fails, do not abort the client response since the main inquiry went through
      console.error('[SMTP Client Error]: Failed to send auto-reply confirmation:', replyError.message);
    }

    // 3. Return JSON success response
    return res.status(200).json({
      success: true,
      message: 'Inquiry received successfully! Our team will get back to you soon.',
    });

  } catch (error) {
    // Forward unexpected exceptions to global error handler
    next(error);
  }
};

module.exports = {
  handleContactSubmission,
};
