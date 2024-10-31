import { UUID } from "../../../types";

export type ProjectProps = {
    id : UUID;
    title: string;
    imageURL?: string;
    projectURL?: string;
    description: string;
    category: string;
    project_date: Date;
    is_public: boolean;
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

