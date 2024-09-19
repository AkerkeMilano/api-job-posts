import bcrypt from "bcrypt"

export const passwordService = {
    async createHash(password: string) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    },
    async compareHash(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword)
    }
}