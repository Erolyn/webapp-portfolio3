import config from "../../../config";
import { ProjectProps } from "../types";

// Fetch Projects
export async function fetchProjectData(): Promise<ProjectProps[]> {
  try {
    const res = await fetch(`${config.apiAddress}:${config.apiPort}/projects`);
    const result = await res.json();
    if(result.success === false){
      throw new Error(result.error.message);
    }
    else return result.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

// Add Project
export async function addProject(
  project: Omit<ProjectProps, "id">
): Promise<ProjectProps> {
  try {
    const res = await fetch(`${config.apiAddress}:${config.apiPort}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...project,
        id: crypto.randomUUID(),
        project_date: project.project_date.toISOString(), // Convert date to ISO string
        is_public: project.is_public,
      }),
    });

    // Check if the response is ok (status in the range 200-299)
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const result = await res.json(); // Assuming the server returns the new project
    if (result.success === false) {
      throw new Error(result.error.message);
    } else return result.data;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
}

// Remove Project
export async function removeProjectData(id: string) {
  const response = await fetch(
      `${config.apiAddress}:${config.apiPort}/projects/${id}`,
      {
        method: "DELETE",
      }
    );
    if(response.status !== 204){
      throw new Error("error removing project")
    }
  }


// Publish Project
export async function publishProject(id: string) {
  try {
    const response = await fetch(
      `${config.apiAddress}:${config.apiPort}/projects/${id}/publish`,
      {
        method: "PUT",
      }
    );
    const result = await response.json();
    if (result.success === false) {
      throw new Error(result.error.message);
    } else return result.data;
  } catch (error) {
    console.error("Error publishing project:", error);
    throw error;
  }
}

// Unpublish Project
export async function unpublishProject(id: string) {
  try {
    const response = await fetch(
      `${config.apiAddress}:${config.apiPort}/projects/${id}/unpublish`,
      {
        method: "PUT",
      }
    );
    const result = await response.json();
    if (result.success === false) {
      throw new Error(result.error.message);
    } else return result.data;
  } catch (error) {
    console.error("Error unpublishing project:", error);
    throw error;
  }
}

// Update project

export async function updateProject(project: Partial<ProjectProps>) {
  try {
    const response = await fetch(
      `${config.apiAddress}:${config.apiPort}/projects/${project.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...project,
        }),
      }
    );

    const result = await response.json();
    if (result.success === false) {
      throw new Error(result.error.message);
    } else return result.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}
