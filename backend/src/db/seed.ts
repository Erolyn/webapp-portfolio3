import { readFile } from "fs/promises";
import { join } from "path";
import { projectsSchema } from "../features/projects/projectValidate";
import { DB } from "./db";

// The seed function will be called when the app starts
export const seed = async (db: DB) => {

  // Drop the projects table if it exists
  db.exec(`DROP TABLE IF EXISTS projects`);

  // Create the projects table
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

  // Read the projects data from the JSON file
  const filePath = join("src", "data", "projects", "projects.json");
  const file = await readFile(filePath, "utf-8"); // Read the JSON file
  const projects = projectsSchema.parse(JSON.parse(file)); // Validate the projects data

  // Prepare the SQL insert statement for projects
  const insertProject = db.prepare(`
      INSERT INTO projects (id, title, imageURL, projectURL, description, category, project_date, is_public)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Create a transaction for inserting projects
  const seedTransaction = db.transaction(() => {
    for (const project of projects) {

      // Transform the project data as needed for your database schema
      insertProject.run(
        project.id,
        project.title,
        project.imageURL ?? null, // Handle nullable fields
        project.projectURL ?? null, // Handle nullable fields
        project.description,
        project.category,
        project.project_date.toISOString(), // Convert date to ISO string
        project.is_public ? 1 : 0 // Convert boolean to integer
      );
    }
  });

  seedTransaction(); // Execute the transaction
};