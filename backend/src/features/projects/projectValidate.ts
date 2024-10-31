import { UUID } from "crypto";
import { z } from "zod";

// Zod validation schema for a project
const projectSchema = z.object({
  id: z.string().uuid().transform(value => value as UUID), // This ensures it's a valid UUID format but treats it as a string
  title: z.string(),
  imageURL: z.string().nullable().optional(),
  projectURL: z.string().nullable().optional(),
  description: z.string(),
  category: z.string(),
  project_date: z.string().transform((str) => new Date(str)), // Transform string to Date
  is_public: z.boolean(),
});

const projectsSchema = z.array(projectSchema);

export { projectSchema, projectsSchema };

