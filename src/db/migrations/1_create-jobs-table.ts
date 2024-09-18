export const createJobPostTable = `
    CREATE TABLE IF NOT EXISTS post (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        salary_range VARCHAR(255) NOT NULL,
        location VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
`;

export const createRecruitersTable = `
    CREATE TABLE IF NOT EXISTS recruiter (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL
    );
`

//        user_id INTEGER
//FOREIGN KEY user_id REFERENCES recruiter (id)