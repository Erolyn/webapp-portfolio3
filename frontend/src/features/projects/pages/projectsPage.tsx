import React, { FormEvent } from "react";
import { UUID } from "../../../types";
import Contact from "../../intro/components/Contact";
import CreateProjectForm from "../components/CreateProjectForm";
import Projects from "../components/Projects";
import useProjects from "../hooks/useProjects";
import { ProjectProps } from "../types";
const student = "Elise Brun";
const degree = "Informatikk - Bachelor";
const points = 180;
const email = "student@hiof.no";
const ProjectPage: React.FC = () => {
  const { projects, create, remove, isLoading, error } = useProjects();
  const onRemoveProjectButtonClicked = async (id: UUID) => {
    await remove(id);
  }
  // Handle adding a new project
  const handleAddProject = async (projectData: Omit<ProjectProps, "id">) => {
    try {
      await create(projectData); // Add the project
      //navigate("/projects"); // Navigate back to the project list after adding
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <div>
      <h1>Projects</h1>
      <div id="project-list">
        <Projects isLoading={isLoading} error={error} projects={projects} onRemoveProjectButtonClicked={onRemoveProjectButtonClicked}>
        </Projects>
      </div>
    </div>
    <div>
    <a id="add-new-project-anchor"><h1>Add New Project</h1></a>
    <CreateProjectForm onCreateProjectFormSubmitted={handleAddProject} />
    </div>
    <a id="contact-anchor">
    <Contact email={email} onContactFormSubmitted={(event: FormEvent<HTMLFormElement>) => {event.preventDefault();alert(`My email is ${email}`)}}></Contact>
    </a></>
  );
};

export default ProjectPage;
