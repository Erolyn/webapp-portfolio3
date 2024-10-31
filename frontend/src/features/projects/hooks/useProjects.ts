import { useCallback, useEffect, useState } from "react";
import { UUID } from "../../../types";
import { addProject, fetchProjectData, removeProjectData } from "../service/projectsApi";
import { ProjectProps } from "../types";
// import { is } from "date-fns/locale";


//Custom hook for handling projects
export default function useProjects() {
    const [projectsList, setProjectsList] = useState<ProjectProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isLoading = !!loading;
    const isError = !!error;
    //Initializing the data from the server, fetching the projects
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const projects = await fetchProjectData();
            setProjectsList(projects ?? []);
            // console.log("Fetched projects:", projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
            console.log("Failed to fetch projects");
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Create project
    const createProject = async (project: Omit<ProjectProps, "id">) =>{
        try {
            await addProject(project);
        } catch (error) {
            
        } finally {
            await fetchData();
        }
    }
    // Remove projects
    const removeProject = async (id: UUID) =>{
        try {
            await removeProjectData(id);
        } catch (error) {
            setError("Error removing project.");
        }
        finally {
            await fetchData();
        }
    }
    
    // Update projects
    const updateProject = async (id: UUID, project: Omit<ProjectProps, "id">) =>{
        try {
            await updateProject(id, project);
        } catch (error) {
            setError("Error updating project.");
            
        }
        finally {
            await fetchData();
        }
    }
    
    // Publish projects
    const publishProject = async (id: UUID) =>{
        try {
            await publishProject(id);
        } catch (error) {
            setError("Error publishing project.");
        }
        finally {
            await fetchData();
        }
    }

    // Unpublish projects
    const unpublishProject = async (id: UUID) =>{
        try {
            await unpublishProject(id);
        } catch (error) {
            setError("Error unpublishing project.");
        }
        finally {
            await fetchData();
        }
        
    }
    return {
        create: createProject,
        get: fetchData,
        update: updateProject,
        remove: removeProject,
        publish: publishProject,
        unpublish: unpublishProject,
        projects: projectsList,
        isLoading,
        isError,
        error,
    }
};