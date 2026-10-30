const validateInquiry = (req, res, next) => {
    const {
        name,
        email,
        phone,
        user_type,
        category,
        message,
    } = req.body;

    // Check required fields
    if (
        !name ||
        !email ||
        !phone ||
        !user_type ||
        !category ||
        !message
    ) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required.',
        });
    }

    // Validate name
    if (name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Name must contain at least 2 characters.',
        });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid email address.',
        });
    }

    // Validate phone number
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (!phoneRegex.test(phone.trim())) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid phone number.',
        });
    }

    // Validate user type
    const validUserTypes = ['Parent', 'Student', 'School'];

    if (!validUserTypes.includes(user_type)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user type.',
        });
    }

    // Validate category
    const validCategories = [
        'Scholarship',
        'Concert',
        'Admission',
        'General Query',
    ];

    if (!validCategories.includes(category)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid inquiry category.',
        });
    }

    // Validate message
    if (typeof message !== 'string' || message.trim().length < 5) {
        return res.status(400).json({
            success: false,
            message: 'Message must contain at least 5 characters.',
        });
    }

    // Pass validated data to the next middleware/controller
    req.body = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        user_type,
        category,
        message: message.trim(),
    };

    next();
};

module.exports = validateInquiry;