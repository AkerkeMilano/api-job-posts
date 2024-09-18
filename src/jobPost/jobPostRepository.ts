import { db } from "../db/db"
import { PostEntityType, FilterType } from "./types"

export const jobPostRepository = {
    async createPost(dto: PostEntityType) {
        const createdPost = await db.query('INSERT INTO post (title, description, salary_range, location) VALUES ($1, $2, $3, $4) RETURNING *', [dto.title, dto.description, dto.salary, dto.location])
        return createdPost.rows[0]
    },
    async getAllPosts(filter: FilterType) {
        let query = 'SELECT * FROM post WHERE 1=1'
        let queryParams: any = []
    
        if (filter.location) {
            queryParams.push(filter.location)
            query += ` AND location ILIKE $${queryParams.length}`
        }
    
        if (filter.title) {
            queryParams.push(filter.title)
            query += ` AND title ILIKE $${queryParams.length}`
        }
    
        query += ` ORDER BY created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
        queryParams.push(filter.limit, filter.offset)

        const result = await db.query(query, queryParams)
   
        const countResult = await db.query('SELECT COUNT(*) FROM post WHERE 1=1')
        return {
            totalItems: parseInt(countResult.rows[0].count),
            totalPages: Math.ceil(countResult.rows[0].count / filter.limit),
            currentPage: parseInt(filter.page),
            jobs: result.rows,
        }
    },
    async getPostById(postId: string) {
        const post = await db.query('SELECT * FROM post WHERE id = $1', [postId])
        return post.rows[0]
    },
    async updatePost(dto: PostEntityType, postId: string) {
        const updatedJobPost = await db.query(
            'UPDATE post SET title = $1, description = $2, salary_range = $3, location = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
            [dto.title, dto.description, dto.salary, dto.location, postId]
          )
        return updatedJobPost.rows[0]
    },
    async deletePost(postId: string) {
        const result = await db.query('DELETE FROM post WHERE id = $1', [postId])
        return result.rowCount === 1
    }
}