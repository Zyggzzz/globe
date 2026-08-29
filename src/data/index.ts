import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { relations } from "@/data/relations";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}

export const conn = globalForDb.conn ?? postgres(dbUrl);

export const db = drizzle({ client: conn, relations });
