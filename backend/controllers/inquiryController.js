const pool = require('../config/database');

// Create a new inquiry
const createInquiry = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            user_type,
            category,
            message,
        } = req.body;

        const query = `
      INSERT INTO inquiries (
        name,
        email,
        phone,
        user_type,
        category,
        message
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, email, phone, user_type,
                category, message, status, created_at
    `;

        const values = [
            name,
            email,
            phone,
            user_type,
            category,
            message,
        ];

        const result = await pool.query(query, values);

        return res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully!',
            data: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};
const getAllInquiries = async (req, res, next) => {
    try {
        const { category, user_type, search } = req.query;

        let query = `
            SELECT
                id,
                name,
                phone,
                email,
                user_type,
                category,
                status,
                created_at
            FROM inquiries
            WHERE 1 = 1
        `;

        const values = [];

        if (category) {
            values.push(category);
            query += ` AND category = $${values.length}`;
        }

        if (user_type) {
            values.push(user_type);
            query += ` AND user_type = $${values.length}`;
        }

        if (search) {
            values.push(`%${search}%`);
            query += ` AND (name ILIKE $${values.length} OR phone ILIKE $${values.length})`;
        }

        query += ' ORDER BY created_at DESC';

        const result = await pool.query(query, values);

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows,
        });
    } catch (error) {
        next(error);
    }
};
const updateInquiryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Contacted', 'Resolved'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid inquiry status.',
            });
        }

        const result = await pool.query(
            `UPDATE inquiries
             SET status = $1
             WHERE id = $2
             RETURNING id, name, status`,
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Inquiry not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Inquiry status updated successfully.',
            data: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    createInquiry,
    getAllInquiries,
    updateInquiryStatus,
};