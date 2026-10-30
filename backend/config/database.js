const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
});

pool.on('error', (error) => {
    console.error('Unexpected database error:', error.message);
});

module.exports = pool;