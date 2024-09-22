import { db } from "../db";
import { createJobPostTable } from "./1_create-jobs-table";
import { createJobApplicationTable } from './2_create-application-table';
import { createRecruiterTable } from "./3_create-recruiter-table";

export const runDbMigrations = async () => {
    const client = await db.connect()

    try {
        await client.query(createRecruiterTable)
        await client.query(createJobPostTable)
        await client.query(createJobApplicationTable)
        await client.query('COMMIT')
        console.log("Connected to DB!")
        return true
    } catch(e) {
        await client.query('ROLLBACK')
        console.log("Problems with DB connection!")
        throw e
    } finally {
        client.release()
    }
}