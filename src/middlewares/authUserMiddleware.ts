import { Request, Response, NextFunction } from "express"
import { HTTP_STATUSES } from "../settings"
import { jwtService } from "../adapters/jwtService"
import { AppError } from "../appError"
import { recruiterRepository } from "../recruiter/recruiterRepository"
export const authUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    if(!auth){
        res
            .status(HTTP_STATUSES.UNAUTHORIZED_401)
            .json({})
        return
    }
    const token = auth.split(' ')[1]
    try {
        const userId = await jwtService.getUserIdByToken(token) as number
        if(!userId) throw new AppError('User is not found', HTTP_STATUSES.UNAUTHORIZED_401)

        const user = await recruiterRepository.getUserById(userId)
        if(!user) throw new AppError('User is not found', HTTP_STATUSES.NOT_FOUND_404)

        req.userId = userId
        return next()
    }catch(e) {
        return res
    }
}