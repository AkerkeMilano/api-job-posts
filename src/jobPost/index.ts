import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost } from "./jobPostController";
import { createApplication } from "../jobApplication/jobApplicationController";
import { authUserMiddleware } from "../middlewares/authUserMiddleware";
import { jobPostInputValidators } from "../middlewares/validators/jobPostValidator";
import { jobApplicationInputValidators } from "../middlewares/validators/jobApplicationValidator";
import { inputCheckErrorsMiddleware } from "../middlewares/inputCheckErrorsMiddleware";
export const postRouter = Router()

postRouter.post('/', authUserMiddleware, jobPostInputValidators, inputCheckErrorsMiddleware, createPost)
postRouter.get('/', getPosts)
postRouter.put('/:id', authUserMiddleware, updatePost)
postRouter.delete('/:id', authUserMiddleware, deletePost)
postRouter.post('/:id/apply', jobApplicationInputValidators, inputCheckErrorsMiddleware, createApplication)