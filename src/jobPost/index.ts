import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost } from "./jobPostController";
export const postRouter = Router()

postRouter.post('/', createPost)
postRouter.get('/', getPosts)
postRouter.put('/:id', updatePost)
postRouter.delete('/:id', deletePost)