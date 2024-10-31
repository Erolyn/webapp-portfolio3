import { DB } from "@/db/db";
import { UUID } from "crypto";
import { Result } from "../../types";
import { DbProject, fromDb, toDb } from "./projectMapper";
import { Project } from "./projectTypes";

// Function to create a project repository
export const createProjectRepository = (db: DB) => {
  // Function to create a project in the database
  const create = async (data: Project): Promise<Result<Project>> => {
    try {
      const insertProject = db.prepare(`
        INSERT INTO projects (id, title, category, description, projectURL, imageURL, is_public, project_date)
        VALUES (@id, @title, @category, @description, @projectURL, @imageURL, @is_public, @project_date)
      `);
      const insertTransaction = db.transaction((project: Project) => {
        insertProject.run(toDb(project));
      });
      insertTransaction(data);
      return { success: true, data };
    } catch (error) {
      console.error('Error creating project:', error);
      return {
        success: false,
        error: { code: "500", message: "Internal Server Error" },
      };
    }
  };

  // Function to list all projects in the database
  const list = async (): Promise<Result<Project[]>> => {
    try {
      const projects = db.prepare("SELECT * FROM projects").all() as DbProject[];
      const mappedProjects: Project[] = projects.map((project) => fromDb(project));
      return { success: true, data: mappedProjects };
    } catch (error) {
      console.error('Error listing projects:', error);
      return {
        success: false,
        error: { code: "500", message: "Internal Server Error" },
      };
    }
  };

  // Function to get a project by id
  const getById = async (id: string): Promise<Result<Project>> => {
    try {
      const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as DbProject;
      if (!project) {
        return {
          success: false,
          error: { code: "404", message: "Project not found" },
        };
      }
      const mappedProject: Project = fromDb(project);
      return { success: true, data: mappedProject };
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      return {
        success: false,
        error: { code: "500", message: "Internal Server Error" },
      };
    }
  };

  // Function to update a project
  const update = async (id: UUID, data: Partial<Project>): Promise<Result<Project>> => {
    try {
      // Fetch the existing project data
      const existingProjectResult = await getById(id);
      if (!existingProjectResult.success) {
        return existingProjectResult;
      }
      const existingProject = existingProjectResult.data;

      // Merge the existing project data with the new data
      const updatedProject = {
        ...existingProject,
        ...data,
        id, // Ensure the id is included
      };

      const updateProject = db.prepare(`
        UPDATE projects
        SET title = @title, category = @category, description = @description, projectURL = @projectURL, is_public = @is_public
        WHERE id = @id
      `);
      const updateTransaction = db.transaction((project: Project) => {
        updateProject.run(toDb(project));
      });
      updateTransaction(updatedProject);
      return { success: true, data: updatedProject };
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error);
      return {
        success: false,
        error: { code: "500", message: "Internal Server Error" },
      };
    }
  };

  // Function to remove a project
  const remove = async (id: string): Promise<Result<null>> => {
    try {
      console.log("wahoo repo!!");
      db.prepare("DELETE FROM projects WHERE id = ?").run(id);
      return { success: true, data: null };
    } catch (error) {
      console.error(`Error removing project with id ${id}:`, error);
      return {
        success: false,
        error: { code: "400", message: "Error removing project" },
      };
    }
  };

  //Function to publish a project, set publish to true
	const publish = async (id: UUID) => {
		try {
			db.prepare(
				"UPDATE projects SET is_public = 'true' WHERE id = ?"
			).run(id);
			return { success: true, data: null };
		} catch (error) {
			const err: Result<Project> = {
				success: false,
				error: { code: "500", message: "Internal Server Error" },
			};
			return err;
		}
	};

	//Function to unpublish a project, set publish to false
	const unpublish = async (id: UUID) => {
		try {
			db.prepare(
				"UPDATE projects SET is_public = 'false' WHERE id = ?"
			).run(id);
			return { success: true, data: null };
		} catch (error) {
			const err: Result<Project> = {
				success: false,
				error: { code: "500", message: "Internal Server Error" },
			};
			return err;
		}
	};

  return {
    create,
    list,
    getById,
    update,
    remove,
    publish,
    unpublish,
  };
};

export type ProjectRepository = ReturnType<typeof createProjectRepository>;