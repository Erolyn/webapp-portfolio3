import React, { useState } from "react";
import { ProjectProps } from "../types";

interface CreateProjectFormProps {
  onCreateProjectFormSubmitted: (
    projectData: Omit<ProjectProps, "id"> & { project_date: Date }
  ) => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  onCreateProjectFormSubmitted,
}) => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [projectURL, setProjectURL] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [project_date, setProjectDate] = useState<Date>(new Date());
  const [is_public, setIsPublic] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onCreateProjectFormSubmitted({
      title,
      imageURL,
      projectURL,
      description,
      category,
      project_date,
      is_public,
    });

    // Clear form fields after submission
    setTitle("");
    setImageURL(undefined);
    setProjectURL(undefined);
    setDescription("");
    setCategory("");
    setProjectDate(new Date());
    setIsPublic(false);
  };

  return (
    <div id="project-form-container">
      <form id="project-form" onSubmit={handleSubmit}>
        <h3>Add New Project</h3>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          value={imageURL || ""}
          onChange={(e) => setImageURL(e.target.value || undefined)}
        />
        <label>Project URL:</label>
        <input
          type="text"
          value={projectURL || ""}
          onChange={(e) => setProjectURL(e.target.value || undefined)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <label>Project Date:</label>
        <input
          type="date"
          value={project_date.toISOString().split("T")[0]} // Format for input
          onChange={(e) => setProjectDate(new Date(e.target.value))}
          required
        />
        <label>Is Public:</label>
        <input
          type="checkbox"
          checked={is_public}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
