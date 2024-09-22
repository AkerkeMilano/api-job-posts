import { req } from "../__tests__/test-helpers";
import { SETTINGS, HTTP_STATUSES } from "../src/settings";
import { createTables, dropTables } from "../__tests__/db";
import { db } from "../src/db/db";
import { passwordService } from "../src/adapters/passwordService";
describe('/posts', () => {
    let accessToken: string; 
    let recruiterId: number;
    let jobId: number;
    beforeAll(async () => {
        await dropTables();
        await createTables();

        //Register new user
        const newUser = {
            login:"user01",
            password:"qwerty1",
            email:"email1p@gg.cm"
        }
        const hashedPassword = await passwordService.createHash(newUser.password)
        const recruiterRes = await db.query('INSERT INTO recruiter (login, email, password) VALUES ($1, $2, $3) RETURNING *', [newUser.login, newUser.email, hashedPassword])

        recruiterId = recruiterRes.rows[0].id

        ///Login user
        const userInfo = {
            loginOrEmail:"user01",
            password:"qwerty1"
        }
        const loginRes = await req.post(SETTINGS.PATH.AUTH + '/login').send(userInfo)

        accessToken = loginRes.body.accessToken

        const jobInfo = {
            title: "Java Developer",
            description: "You will be responsible for backend development",
            salary: "500000-700000",
            location: "Almaty"
        }

        const job = await db.query('INSERT INTO post (title, description, salary_range, location, recruiter_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [jobInfo.title, jobInfo.description, jobInfo.salary, jobInfo.location, recruiterId])
        jobId = job.rows[0].id
    }),
    afterAll(async () => {
        await dropTables();
    }),
    it('should create a new post', async () => {
        const jobInfo = {
            title: "Office manager",
            description: "You will be responsible for calls and clients service",
            salary: "300000-500000",
            location: "Astana"
        }

        const response = await req.post(SETTINGS.PATH.POSTS)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(jobInfo)

        expect(response.statusCode).toBe(HTTP_STATUSES.CREATED_201)
    }),
    it('should not create a post with no location', async () => {
        const jobInfo = {
            title: "Office manager",
            description: "You will be responsible for calls and clients service",
            salary: "300000-500000"
        }

        const response = await req.post(SETTINGS.PATH.POSTS)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(jobInfo)

        expect(response.statusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400)
        expect(response.body.errorsMessages[0].field).toBe('location')
    }),
    it('should return posts', async () => {
        const response = await req.get(SETTINGS.PATH.POSTS)
 
        expect(response.statusCode).toBe(HTTP_STATUSES.OK_200)
    }),
    it('should update post', async () => {
        const response = await req.put(SETTINGS.PATH.POSTS + `/${jobId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ salary_range: "300000-500000"})
        expect(response.statusCode).toBe(HTTP_STATUSES.OK_200)
    }),
    it('should create application for job', async () => {
        const jobApp = {
            name: 'Ainura Malik',
            email: 'ainura@gmail.com',
            resume: 'my resume'
        }

        const response = await req.post(SETTINGS.PATH.POSTS + `/${jobId}/apply`).send(jobApp)

        expect(response.statusCode).toBe(HTTP_STATUSES.CREATED_201)
    }),
    it('should not create application for job since resume is empty', async () => {
        const jobApp = {
            name: 'Ainura Malik',
            email: 'ainura@gmail.com'
        }

        const response = await req.post(SETTINGS.PATH.POSTS + `/${jobId}/apply`).send(jobApp)

        expect(response.statusCode).toBe(HTTP_STATUSES.BAD_REQUEST_400)
        expect(response.body.errorsMessages[0].field).toBe('resume')
    }),
    it('should delete post', async () => {
        const response = await req.delete(SETTINGS.PATH.POSTS + `/${jobId}`)
        .set('Authorization', `Bearer ${accessToken}`)

        expect(response.statusCode).toBe(HTTP_STATUSES.OK_200)
    })
})