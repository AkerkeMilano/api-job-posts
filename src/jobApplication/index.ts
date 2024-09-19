import { Router } from "express";
import { getApplicationsByPostId, manageApplicationById } from "./jobApplicationController";
import { authUserMiddleware } from "../middlewares/authUserMiddleware";
export const applicationRouter = Router()

applicationRouter.get('/:posId', authUserMiddleware, getApplicationsByPostId)
applicationRouter.patch('/:id', authUserMiddleware, manageApplicationById)