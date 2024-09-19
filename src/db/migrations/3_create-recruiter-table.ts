export const createRecruiterTable = `
    CREATE TABLE IF NOT EXISTS recruiter (
        id SERIAL PRIMARY KEY,
        login VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )
`;
