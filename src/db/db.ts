import pg from 'pg'

export const db = new pg.Pool({
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: "jobsapp"
})

