import { recruiterRepository } from "./recruiterRepository"
import { RecruiterEntityType, LoginEntityType } from "./type"
import { passwordService } from "../adapters/passwordService"
import { AppError } from "../appError"
import { HTTP_STATUSES } from "../settings"
import { jwtService } from "../adapters/jwtService"

export const recruiterService = {
    async registerUser(dto: RecruiterEntityType) {
        const updatedUserData = {
            login: dto.login,
            email: dto.email,
            password: await passwordService.createHash(dto.password)
        }
        const createdUser = await recruiterRepository.createUser(updatedUserData)
        return {
            id: createdUser.id,
            login: createdUser.login,
            email: createdUser.email,
            createdAt: createdUser.created_at
        }
    },
    async loginUser(dto: LoginEntityType) {
        const user = await recruiterRepository.isUserExistByEmailOrLogin(dto.loginOrEmail)
        if(!user){
            throw new AppError('User is not found', HTTP_STATUSES.UNAUTHORIZED_401)
        }
        const isPasswordValid = await passwordService.compareHash(dto.password, user.password)
        if(!isPasswordValid) {
            throw new AppError('Wrong password', HTTP_STATUSES.UNAUTHORIZED_401)
        }

        const token = await jwtService.createJWT({userId: user.id}, '20m')
        return token
    }
}