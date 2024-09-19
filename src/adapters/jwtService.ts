import jwt, { JwtPayload } from 'jsonwebtoken'
import { SETTINGS } from '../settings'

export const jwtService = {
    async createJWT(payload: any, expiresIn: string){
        const token = jwt.sign(payload, SETTINGS.JWT_SECRET_KEY, {expiresIn: expiresIn})
        return token
    },
    async getUserIdByToken(token: string){
        try {
            const res: any = jwt.verify(token, SETTINGS.JWT_SECRET_KEY)
            return res.userId
        } catch(e) {
            console.log("JWT error", e)
            return null
        }
    },
}