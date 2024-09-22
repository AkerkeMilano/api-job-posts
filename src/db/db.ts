import pg from 'pg'
import {config} from 'dotenv'
config() 

export const db = new pg.Pool({
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

