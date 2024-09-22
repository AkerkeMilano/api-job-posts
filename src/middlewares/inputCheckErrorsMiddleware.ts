import {validationResult} from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUSES } from '../settings'
export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const e = validationResult(req)
 
    if(!e.isEmpty()) {
        const eArray = e.array({onlyFirstError: true}) as { path: string, msg: string }[]
        res
        .status(HTTP_STATUSES.BAD_REQUEST_400)
        .json({
            errorsMessages: eArray.map(x => ({
                message: x.msg,
                field: x.path
            }))

        })
        return
    }
    next()
}