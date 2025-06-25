
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const connectionString = 'postgresql://neondb_owner:npg_qHSkAB7l9utN@ep-misty-flower-a8tlacd0-pooler.eastus2.azure.neon.tech/neondb?sslmode=require';

const sql = neon(connectionString);
export const db = drizzle(sql);
