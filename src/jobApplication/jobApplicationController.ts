import { NextFunction, Request, Response } from "express";
import { jobApplicationService } from "./jobApplicationService";
import { HTTP_STATUSES } from "../settings";

export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const application = await jobApplicationService.createApplication(req.body, +req.params.id)
        res.status(HTTP_STATUSES.CREATED_201).json(application)
    } catch(e) {
        next(e)
    }
} 

export const getApplicationsByPostId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId
        const postId = +req.params.postId
        const applications = await jobApplicationService.getApplicationsByPostId(postId, userId)
        res.status(HTTP_STATUSES.OK_200).json(applications)
    } catch(e) {
        next(e)
    }
}

export const manageApplicationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId
        const applicationId = +req.params.id
        const { status } = req.body
        const application = await jobApplicationService.manageApplication(status, applicationId, userId)
        res.status(HTTP_STATUSES.OK_200).json(application)
    } catch(e) {
        next(e)
    }
}