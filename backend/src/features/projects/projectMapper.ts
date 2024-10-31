import { UUID } from "crypto";
import { Project } from "./projectTypes";
import { projectSchema } from "./projectValidate";

export type DbProject = {
  id: UUID;             
  title: string;
  imageURL: string | null; 
  projectURL: string | null;
  description: string;
  category: string;
  project_date: string;   
  is_public: number;     
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