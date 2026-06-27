require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { verifyTransporter } = require('./config/nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Secure application with Helmet HTTP headers
app.use(helmet());

// 2. Configure CORS to protect endpoints
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

// 3. Body parsing middleware
app.use(express.json());

// 4. Register API router
app.use('/api', contactRoutes);

// 5. Global Error Handling Middleware (must be attached after all routes)
app.use(errorHandler);

// 6. Test and verify SMTP configuration on start
verifyTransporter().then((isHealthy) => {
  if (!isHealthy) {
    console.warn('[Warning]: Mail transporter verification failed. Please verify credentials in your .env file.');
  }
});

// 7. Initialize server
app.listen(PORT, () => {
  console.log(`Jigyasa backend server running on port ${PORT}`);
});
