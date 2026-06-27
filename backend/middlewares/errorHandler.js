/**
 * Global Error Handling Middleware.
 * Catches all unhandled exceptions, logs a safe error descriptor locally,
 * and sends a sanitized JSON response back to the client.
 */
const errorHandler = (err, req, res, next) => {
  // Log the error internally for operators, without logging credentials or stack trace to client
  console.error('[Unhandled Internal Error]:', err.message || err);

  res.status(err.status || 500).json({
    success: false,
    error: 'An internal server error occurred. Please try again later.',
  });
};

module.exports = errorHandler;
