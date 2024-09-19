import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost } from "./jobPostController";
import { createApplication } from "../jobApplication/jobApplicationController";
import { authUserMiddleware } from "../middlewares/authUserMiddleware";
export const postRouter = Router()

postRouter.post('/', authUserMiddleware, createPost)
postRouter.get('/', getPosts)
postRouter.put('/:id', authUserMiddleware, updatePost)
postRouter.delete('/:id', authUserMiddleware, deletePost)
postRouter.post('/:id/apply', createApplication)