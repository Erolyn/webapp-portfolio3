
import { readFile, writeFile } from "fs/promises";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { join } from "path";
import { Experience } from "./features/experiences/types";
import { projectController } from "./features/projects/projectController";

const app = new Hono();
app.use("/*", cors());
// Use the projectController for project-related routes
app.route("/projects", projectController);

// Define a GET route to fetch experiences
app.get("/experiences", async (c) => {
  try {
    const filePath = join("src", "data", "experiences", "experiences.json");
    const data = await readFile(filePath, "utf8");
    const experiences: Experience[] = JSON.parse(data);
    return c.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return c.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
});

// Define a POST route to add a new experience
app.post("/experiences", async (c) => {
  try {
    const newExperience: Experience = await c.req.json();
    const filePath = join("src", "data", "experiences", "experiences.json");
    const data = await readFile(filePath, "utf8");
    const experiences = JSON.parse(data);
    experiences.push(newExperience);
    await writeFile(filePath, JSON.stringify(experiences, null, 2));
    return c.json(newExperience, { status: 201 });
  } catch (error) {
    console.error("Error adding experience:", error);
    return c.json({ error: "Failed to add experience" }, { status: 500 });
  }
});

// Define a PUT route to update an experience
app.put("/experiences/:id", async (c) => {
  try {
    const updatedExperience: Experience = await c.req.json();
    const experienceId = c.req.param("id");
    const filePath = join("src", "data", "experiences", "experiences.json");
    const data = await readFile(filePath, "utf8");
    const experiences = JSON.parse(data);
    const experienceIndex = experiences.findIndex(
      (experience: Experience) => experience.id === experienceId
    );
    if (experienceIndex !== -1) {
      experiences[experienceIndex] = updatedExperience;
      await writeFile(filePath, JSON.stringify(experiences, null, 2));
      return c.json(updatedExperience, { status: 204 });
    } else {
      return c.json({ error: "Experience not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating experience:", error);
    return c.json({ error: "Failed to update experience" }, { status: 500 });
  }
});

// Define a DELETE route to remove an experience
app.delete("/experiences/:id", async (c) => {
  try {
    const experienceId = c.req.param("id");
    const filePath = join("src", "data", "experiences", "experiences.json");
    const data = await readFile(filePath, "utf8");
    const experiences = JSON.parse(data);
    const updatedExperiences = experiences.filter(
      (experience: Experience) => experience.id !== experienceId
    );
    await writeFile(filePath, JSON.stringify(updatedExperiences, null, 2));
    return c.json({ success: true }, { status: 204 });
  } catch (error) {
    console.error("Error removing experience:", error);
    return c.json({ error: "Failed to remove experience" }, { status: 500 });
  }
});

export default app;