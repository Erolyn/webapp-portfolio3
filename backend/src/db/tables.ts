import type { DB } from "./db";

// Creating tables
export const createTables = async (db: DB) => {
  db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT NOT NULL PRIMARY KEY,  -- UUIDs are stored as TEXT in SQLite
    title TEXT NOT NULL,
    imageURL TEXT,
    projectURL TEXT,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    project_date DATETIME NOT NULL,
    is_public BOOLEAN NOT NULL
  );
`);
};