import { db } from "../db/db"
import { RecruiterEntityType } from "./type"

export const recruiterRepository = {
    async createUser(dto: RecruiterEntityType) {
        const createdUser = await db.query('INSERT INTO recruiter (login, email, password) VALUES ($1, $2, $3) RETURNING *', [dto.login, dto.email, dto.password])
        return createdUser.rows[0]
    },
    async isUserExistByEmailOrLogin(emailOrLogin: string) {
        const user = await db.query('SELECT * FROM recruiter WHERE login = $1 OR email = $2 LIMIT 1', [emailOrLogin, emailOrLogin])
        return user.rows[0]
    },
    async getUserById(userId: number) {
        const user = await db.query('SELECT * FROM recruiter WHERE id = $1', [userId])
        return user.rows[0]
    }
}