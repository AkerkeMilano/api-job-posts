import { AppError } from "../appError"
import { HTTP_STATUSES } from "../settings"
import { jobApplicationRepository } from "./jobApplicationRepository"
import { jobPostRepository } from "../jobPost/jobPostRepository"
import { recruiterRepository } from "../recruiter/recruiterRepository"
import { ApplicationEntityType } from "./types"

export const jobApplicationService = {
    async createApplication(dto: ApplicationEntityType, postId: number) {
        const createdApplication = await jobApplicationRepository.createApplication(dto, postId)
        const post = await jobPostRepository.getPostById(postId)
        if(!post) throw new AppError('Post is not found', HTTP_STATUSES.NOT_FOUND_404)
        const user = await recruiterRepository.getUserById(post.recruiter_id)
        if(!user) throw new AppError('User is not found', HTTP_STATUSES.NOT_FOUND_404)
        
        console.log(`Sending email notification to recruiter: ${user.email}`);
        return createdApplication
    },
    async getApplicationsByPostId(postId: number, userId: number) {
        const appliedPost = await jobPostRepository.getPostById(postId)
        if(!appliedPost) throw new AppError('Post is not found', HTTP_STATUSES.NOT_FOUND_404)
        if(appliedPost.recruiter_id !== userId) throw new AppError('Current user cannot see this application', HTTP_STATUSES.FORBIDDEN_403)

        const applications = await jobApplicationRepository.getApplications(postId)
        return applications
    },
    async manageApplication(status: string, applicationId: number, userId: number) {
        const editedApplication = await jobApplicationRepository.getApplicationById(applicationId)
        if(!editedApplication) throw new AppError('Application is not found', HTTP_STATUSES.NOT_FOUND_404)

        const appliedPost = await jobPostRepository.getPostById(editedApplication.post_id)
        if(!appliedPost) throw new AppError('Post is not found', HTTP_STATUSES.NOT_FOUND_404)

        if(appliedPost.recruiter_id !== userId) throw new AppError('Current user cannot edit this application', HTTP_STATUSES.FORBIDDEN_403)

        const validStatuses = ['shortlisted', 'rejected', 'pending']
        if(!validStatuses.includes(status)) throw new AppError('Invalid status type', HTTP_STATUSES.BAD_REQUEST_400)

        const application = await jobApplicationRepository.updateApplicationStatus(status, applicationId)
        return application
    }
}