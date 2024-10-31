import path from "path";

export const getProjectsPath = () =>
  path.join(__dirname, "../data/projects/projects.json");

export const getExperiencesPath = () =>
  path.join(__dirname, "../data/experiences/experiences.json");
