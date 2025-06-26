
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const connectionString = 'postgresql://neondb_owner:npg_qHSkAB7l9utN@ep-fragrant-truth-a87ffjpc-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(connectionString);
export const db = drizzle(sql);
