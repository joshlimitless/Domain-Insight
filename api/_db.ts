import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

declare global {
  // allow global pooling across lambda invocations
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!global.__pgPool) {
    global.__pgPool = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  return global.__pgPool as Pool;
}

export function getDb() {
  const pool = getPool();
  return drizzle(pool);
}

