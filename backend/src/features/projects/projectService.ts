import db from "@/db/db";
import { createProjectRepository, ProjectRepository } from "./projectRepository";
import { Project } from "./projectTypes";
import { projectSchema } from "./projectValidate";

// Function to create a project service
export const createProjectService = (projectRepository: ProjectRepository) => {
	return {
		create: (data: Project) => {
			console.log(JSON.stringify(data, null, 2));
			return projectRepository.create(
				projectSchema.parse({
					...data,
					createdAt: new Date().toISOString(),
				})
			);
		},
		list: projectRepository.list,
		getById: projectRepository.getById,
		update: projectRepository.update,
		remove: projectRepository.remove,
		publish: projectRepository.publish,
		unpublish: projectRepository.unpublish,
	};
};

// Create a project service
export const projectService = createProjectService(createProjectRepository(db));

// Export the type of the project service
export type ProjectService = ReturnType<typeof createProjectService>;