
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgresql://neondb_owner:npg_qHSkAB7l9utN@ep-misty-flower-a8tlacd0-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
} satisfies Config;
