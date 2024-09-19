import { NextFunction, Request, Response } from "express";
import { jobPostService } from "./jobPostService";
import { HTTP_STATUSES } from "../settings";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId

        const post = await jobPostService.createPost(req.body, userId)
        res.status(HTTP_STATUSES.CREATED_201).json(post)
    } catch(e){
        next(e)
    }
} 

export const getPosts = async (req: Request, res: Response) => {
    const page = req.query.page ? String(req.query.page) : '1'
    const location = req.query.location ? String(req.query.location) : ''
    const title = req.query.title ? String(req.query.title) : ''
    const posts = await jobPostService.getAllPosts({ page, location, title })
    res.status(HTTP_STATUSES.OK_200).json(posts)
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId
        const updatedPost = await jobPostService.updatePost(req.body, +req.params.id, userId)
        res.status(HTTP_STATUSES.OK_200).json(updatedPost)
    } catch(e) {
        next(e)
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId
        await jobPostService.deletePost(+req.params.id, userId)
        res.status(HTTP_STATUSES.OK_200).json()
    } catch(e) {
        next(e)
    }
}