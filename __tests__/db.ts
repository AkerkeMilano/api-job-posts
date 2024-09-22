import { db } from '../src/db/db';
import { runDbMigrations } from './../src/db/migrations/index';
export const createTables = async () => {
  await runDbMigrations()
};

export const dropTables = async () => {
    await db.query('DROP TABLE IF EXISTS application, post, recruiter');
  };
  
