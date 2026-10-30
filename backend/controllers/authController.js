const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.',
            });
        }
        // Find admin by email
        const result = await pool.query(
            'SELECT * FROM admins WHERE email = $1',
            [email.trim().toLowerCase()]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        const admin = result.rows[0];

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { loginAdmin };