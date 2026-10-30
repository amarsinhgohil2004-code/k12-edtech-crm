-- Admins table
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    user_type VARCHAR(20) NOT NULL
        CHECK (user_type IN ('Parent', 'Student', 'School')),
    category VARCHAR(30) NOT NULL
        CHECK (category IN ('Scholarship', 'Concert', 'Admission', 'General Query')),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending'
        CHECK (status IN ('Pending', 'Contacted', 'Resolved')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster filtering and sorting
CREATE INDEX IF NOT EXISTS idx_inquiries_category
ON inquiries(category);

CREATE INDEX IF NOT EXISTS idx_inquiries_user_type
ON inquiries(user_type);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at
ON inquiries(created_at DESC);