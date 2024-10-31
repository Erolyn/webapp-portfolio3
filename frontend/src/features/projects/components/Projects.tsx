import React, { PropsWithChildren } from 'react';
import { ProjectsProps } from '../types';
import Project from './Project';


function Projects(props: Readonly<PropsWithChildren<ProjectsProps>>) {
  if (props.isLoading) {
    return <p>Loading projects...</p>;
  }

  if (props.error) {
    return <p>{props.error}</p>;
  }

  const renderProjectList = () => (
    <div id="projects-container">
      {props.projects.map((project) => (
        <Project key={project.id} id={project.id} title={project.title} description={project.description} category={project.category} project_date={project.project_date} is_public={project.is_public}><button onClick={() => props.onRemoveProjectButtonClicked(project.id)}>
            Remove project
          </button></Project>
      ))}
    </div>
  );

  const renderProjectCountByCategory = () => {
    const projectCountByCategory = props.projects.reduce((acc, { category }) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div className="category-list">
        <h2>Total Projects per Category:</h2>
        <ul>
          {Object.entries(projectCountByCategory).map(([category, count]) => (
            <li key={category}>
              {category}: {count}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section>
      {props.children}
      {props.projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <>
          {renderProjectList()}
          {renderProjectCountByCategory()}
        </>
      )}
    </section>
  );
};

export default Projects;