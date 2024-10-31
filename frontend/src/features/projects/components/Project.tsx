import type { PropsWithChildren } from "react";
import React from "react";
import { ProjectProps } from "../types";

export default function Project(
  props: Readonly<PropsWithChildren<ProjectProps>>
) {
  const {
    id,
    title,
    category,
    description,
    imageURL,
    projectURL,
    project_date,
    is_public,
    children,
  } = props;
  return (
    <article className="project project-card">
      <div className="project-visibility">
        {is_public ? (
          <>
            <span>Public</span>
          </>
        ) : (
          <>
            <span>Private</span>
          </>
        )}
      </div>
      <div className="project-item project-card">
          <h3>{title}</h3>
          <p>Category: {category}</p>
          <p>Description: {description}</p>
          {children}
        </div>
    </article>
  );
}


