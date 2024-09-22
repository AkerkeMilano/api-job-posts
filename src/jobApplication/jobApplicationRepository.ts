import { db } from "../db/db"
import { ApplicationEntityType } from "./types"

export const jobApplicationRepository = {
    async createApplication(dto: ApplicationEntityType, postId: number) {
        const createdApplication = await db.query('INSERT INTO application (name, email, resume, post_id) VALUES ($1, $2, $3, $4) RETURNING *', [dto.name, dto.email, dto.resume, postId])
        return createdApplication.rows[0]
    },
    async getApplications(postId: number) {
        const applicationsOfPost = await db.query('SELECT * FROM application WHERE post_id = $1', [postId]);
        return applicationsOfPost.rows
    },
    async updateApplicationStatus(status: string, applicationId: number) {
        const updatedApplication = await db.query(
            'UPDATE application SET status = $1 WHERE id = $2 RETURNING *',
            [status, applicationId]
          );
          return updatedApplication.rows[0]
    },
    async getApplicationById(applicationId: number) {
        const application = await db.query('SELECT * FROM application WHERE id = $1', [applicationId]);
        return application.rows[0]
    }
}