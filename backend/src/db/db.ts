import type { Database } from "better-sqlite3";
import BetterSqlite3 from "better-sqlite3";
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { env } from "../lib/env";

// Ensure the directory exists
const ensureDirectoryExists = (dbPath: string) => {
  const dbDir = dirname(dbPath);
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
  }
};

const dbPath = env.DATABASE_URL.replace("file:", "");
ensureDirectoryExists(dbPath);

// Create a new instance of the database
export const db: Database = new BetterSqlite3(dbPath, { verbose: console.log });

// Export the database instance
export type DB = typeof db;

export default db;