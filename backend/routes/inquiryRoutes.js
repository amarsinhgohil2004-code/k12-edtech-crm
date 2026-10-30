const express = require('express');
const router = express.Router();

const {
    createInquiry,
    getAllInquiries,
    updateInquiryStatus,
} = require('../controllers/inquiryController');

const validateInquiry = require('../middleware/validateInquiry');
const protect = require('../middleware/authMiddleware');

// Public route: Submit inquiry
router.post('/', validateInquiry, createInquiry);

// Protected route: Get all inquiries
router.get('/', protect, getAllInquiries);

// Protected route: Update inquiry status
router.patch('/:id/status', protect, updateInquiryStatus);

module.exports = router;