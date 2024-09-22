export const createJobApplicationTable = `
    CREATE TABLE IF NOT EXISTS application (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        resume TEXT,
        status VARCHAR(50) DEFAULT 'submitted',
        created_at TIMESTAMP DEFAULT NOW(),
        post_id INT REFERENCES post(id) ON DELETE CASCADE
    );
`;