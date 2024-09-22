import { req } from "./test-helpers";
import { SETTINGS, HTTP_STATUSES } from "../src/settings";
import { createTables, dropTables } from "./db";
describe('/users', () => {
    beforeAll(async () => {
        await dropTables();
        await createTables();
    });
      
    afterAll(async () => {
        await dropTables();
    });
    it('should create a new recruiter', async () => {
        const newUser = {
            login:"user01",
            password:"qwerty1",
            email:"email1p@gg.cm"
        }
        const response = await req.post(SETTINGS.PATH.AUTH + '/register').send(newUser)
        expect(response.statusCode).toBe(HTTP_STATUSES.CREATED_201)
        expect(response.body).toHaveProperty('login');
    }),
    it('should login recruiter and send access token', async () => {
        const userInfo = {
            loginOrEmail:"user01",
            password:"qwerty1"
        }
        const response = await req.post(SETTINGS.PATH.AUTH + '/login').send(userInfo)
        expect(response.statusCode).toBe(HTTP_STATUSES.OK_200)
        expect(response.body).toHaveProperty('accessToken');
    })

})