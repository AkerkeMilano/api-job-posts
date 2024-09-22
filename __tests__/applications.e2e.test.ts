import { req } from "./test-helpers";
import { SETTINGS, HTTP_STATUSES } from "../src/settings";
import { db } from "../src/db/db";
import { createTables, dropTables } from "./db";
import { passwordService } from "../src/adapters/passwordService";

describe('/applications', () => {
    let accessToken: string;
    let recruiterId: number;
    let jobId: number;
    let applicationId: number;
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

        ///Create new job post
        const jobInfo = {
            title: "Java Developer",
            description: "You will be responsible for backend development",
            salary: "500000-700000",
            location: "Almaty"
        }

        const job = await db.query('INSERT INTO post (title, description, salary_range, location, recruiter_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [jobInfo.title, jobInfo.description, jobInfo.salary, jobInfo.location, recruiterId])
        jobId = job.rows[0].id
        ///Apply for job
        const jobApp1 = {
            name: 'Ainura Malik',
            email: 'ainura@gmail.com',
            resume: 'my resume'
        }

        const application = await db.query('INSERT INTO application (name, email, resume, post_id) VALUES ($1, $2, $3, $4) RETURNING *', [jobApp1.name, jobApp1.email, jobApp1.resume, jobId])

        const jobApp2 = {
            name: 'Sabit Egorov',
            email: 'sabit.e@gmail.com',
            resume: 'my resume'
        }

        const application2 = await db.query('INSERT INTO application (name, email, resume, post_id) VALUES ($1, $2, $3, $4) RETURNING *', [jobApp2.name, jobApp2.email, jobApp2.resume, jobId])

        applicationId = application.rows[0].id
    }),
    afterAll(async () => {
        await dropTables();
    });
    it('should return applications by post id', async () => {
        const response = await req.get(SETTINGS.PATH.APPLICATIONS + `/${jobId}`)
        .set('Authorization', `Bearer ${accessToken}`)
 
        expect(response.statusCode).toBe(HTTP_STATUSES.OK_200)
        expect(response.body.length).toBe(2)
    }),
    it('should update the status of application', async () => {
        const response = await req.patch(SETTINGS.PATH.APPLICATIONS + `/${applicationId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ status: 'rejected'})

        expect(response.statusCode).toBe(HTTP_STATUSES.OK_200)
        expect(response.body.status).toBe('rejected')
    })
})