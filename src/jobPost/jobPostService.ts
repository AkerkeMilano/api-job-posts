import { jobPostRepository } from "./jobPostRepository"
import { PostEntityType, QueryType } from "./types"
import { AppError } from "../appError"
import { HTTP_STATUSES } from "../settings"

export const jobPostService = {
    async createPost(dto: PostEntityType, userId: number) {
        const createdPost = await jobPostRepository.createPost(dto, userId)
        return createdPost
    },
    async getAllPosts(query: QueryType) {
        const { page, location, title } = query
        const limit = 10
        const offset = (parseInt(page) - 1) * limit
        const res = await jobPostRepository.getAllPosts({page, location, title, limit, offset})
        return res
    },
    async updatePost(dto: PostEntityType, postId: number, userId: number) {
        const post = await jobPostRepository.getPostById(postId)
        if(!post) {
            throw new AppError('Post not found', HTTP_STATUSES.NOT_FOUND_404)
        }
        if(post.recruiter_id !== userId) {
            throw new AppError('Trying to delete not your post', HTTP_STATUSES.FORBIDDEN_403)
        }
        const updatedJobPost = await jobPostRepository.updatePost(dto, postId)
        return updatedJobPost
    },
    async deletePost(postId: number, userId: number) {
        const post = await jobPostRepository.getPostById(postId)
        if(!post) {
            throw new AppError('Post not found', HTTP_STATUSES.NOT_FOUND_404)
        }
        if(post.recruiter_id !== userId) {
            throw new AppError('Trying to delete not your post', HTTP_STATUSES.FORBIDDEN_403)
        }
        const isPostDeleted = await jobPostRepository.deletePost(postId)
        return isPostDeleted
    }
}