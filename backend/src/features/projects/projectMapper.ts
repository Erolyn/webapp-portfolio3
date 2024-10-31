import { UUID } from "crypto";
import { Project } from "./projectTypes";
import { projectSchema } from "./projectValidate";

export type DbProject = {
  id: UUID;             // or UUID type if that's what you're using
  title: string;
  imageURL: string | null; // Allow null for optional fields
  projectURL: string | null;
  description: string;
  category: string;
  project_date: string;   // Assume it's stored as an ISO string in the database
  is_public: number;     // Use number for boolean storage (1 or 0)
};

export const fromDb = (project: DbProject) => {
    return projectSchema.parse({
        id: project.id,
        title: project.title,
        imageURL: project.imageURL,
        projectURL: project.projectURL,
        description: project.description,
        category: project.category,
        project_date: project.project_date,
        is_public: Boolean(project.is_public)
    });
};

export const toDb = (project: Project) => {
    return {
        id: project.id,
        title: project.title,
        imageURL: project.imageURL,
        projectURL: project.projectURL,
        description: project.description,
        category: project.category,
        project_date: project.project_date.toISOString(),
        is_public: Number(project.is_public)
    };
};