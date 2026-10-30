const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const inquiryRoutes = require('./routes/inquiryRoutes');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const app = express();

// Security middleware
app.use(helmet());
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});
// CORS configuration
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'K12 Hunar CRM API is running',
    });
});
app.use(errorMiddleware);
module.exports = app;