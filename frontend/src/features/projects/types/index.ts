import { UUID } from "../../../types";

export type ProjectProps = {
    id : UUID; // UUIDs are stored as strings
    title: string;
    imageURL?: string; // Updated to match the database schema
    projectURL?: string; // Added to match the database schema
    description: string;
    category: string;
    project_date: Date; // Updated to match the database schema
    is_public: boolean; // Added to match the database schema
  };
  
  export type CreateProjectFormProps = {
    onCreateProjectFormSubmitted: (
      projectData: Omit<ProjectProps, "id">
    ) => void;
  };
  
  export type ProjectsProps = {
    projects: ProjectProps[];
    isLoading: boolean;
    error: string | null;
    onRemoveProjectButtonClicked: (id: UUID) => void;
  };

