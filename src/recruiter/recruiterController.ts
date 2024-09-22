import { NextFunction, Request, Response } from "express";
import { recruiterService } from "./recruiterService";
import { HTTP_STATUSES } from "../settings";
export const registerRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await recruiterService.registerUser(req.body)
        res.status(HTTP_STATUSES.CREATED_201).json(user)
    } catch(e) {
        next(e)
    }
} 

export const loginRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await recruiterService.loginUser(req.body)
        res.status(HTTP_STATUSES.OK_200).json({
            "accessToken": token
          })
    } catch(e) {
        next(e)
    }
}