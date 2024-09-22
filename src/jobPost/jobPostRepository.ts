import { db } from "../db/db"
import { PostEntityType, FilterType } from "./types"

export const jobPostRepository = {
    async createPost(dto: PostEntityType, userId: number) {
        const createdPost = await db.query('INSERT INTO post (title, description, salary_range, location, recruiter_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [dto.title, dto.description, dto.salary, dto.location, userId])
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
    async getPostById(postId: number) {
        const post = await db.query('SELECT * FROM post WHERE id = $1', [postId])
        return post.rows[0]
    },
    async updatePost(dto: any, postId: number) {
        const fields = Object.keys(dto);
        const query = `
        UPDATE post
        SET ${fields.map((field, index) => `${field} = $${index + 1}`).join(', ')}, updated_at = NOW()
        WHERE id = $${fields.length + 1} RETURNING *
         `;
        const values = [...fields.map(field => dto[field]), postId];
        const updatedJobPost = await db.query(query, values);
        return updatedJobPost.rows[0]
    },
    async deletePost(postId: number) {
        const result = await db.query('DELETE FROM post WHERE id = $1', [postId])
        return result.rowCount === 1
    }
} 