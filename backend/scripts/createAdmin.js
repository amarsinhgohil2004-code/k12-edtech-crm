require('dotenv').config();

const pool = require('../config/database');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
    try {
        const name = process.env.ADMIN_NAME;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!name || !email || !password) {
            throw new Error('Admin environment variables are missing.');
        }

        const existingAdmin = await pool.query(
            'SELECT id FROM admins WHERE email = $1',
            [email]
        );

        if (existingAdmin.rows.length > 0) {
            console.log('Admin already exists.');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await pool.query(
            `INSERT INTO admins (name, email, password)
             VALUES ($1, $2, $3)`,
            [name, email, hashedPassword]
        );

        console.log('Admin created successfully!');
        console.log('Email:', email);

    } catch (error) {
        console.error('Error creating admin:', error.message);
    } finally {
        await pool.end();
    }
};

createAdmin();