import { db } from "../db";
import { createJobPostTable } from "./1_create-jobs-table";

export const runDbMigrations = async () => {
    const client = await db.connect()

    try {
        await client.query(createJobPostTable)
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