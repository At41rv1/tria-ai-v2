
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// You'll need to replace this with your actual Neon connection string
const connectionString = 'postgresql://username:password@host.neon.tech/dbname?sslmode=require';

const sql = neon(connectionString);
export const db = drizzle(sql);
