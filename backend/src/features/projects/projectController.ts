import { UUID } from "crypto";
import { Hono } from "hono";
import { projectService, ProjectService } from "./projectService";
import { Project } from "./projectTypes";
import { projectSchema } from "./projectValidate";

// Function to create a project controller
export const createProjectController = (projectService: ProjectService) => {
  // Create a new Hono app
  const app = new Hono();

  // Route to get all projects
  app.get("/", async (ctx) => {
    const data = await projectService.list();
    if (data.success === true) {
      const results = data.data as Project[];
      return ctx.json(data);
    } else {
      return ctx.json({data}, 500);
    }
  });

  // Route to get project by id
  app.get("/:id", async (ctx) => {
    const id = ctx.req.param("id") as UUID;
    const data = await projectService.getById(id);
    if (data.success === true) {
      const results = data.data as Project;
      return ctx.json(data);
    } else {
      return ctx.json({data}, 404);
    }
  });

  // Route to add a new project
  app.post("/", async (ctx) => {
    const data = await ctx.req.json();
    // const result = projectSchema.safeParse(data);
    // if (!result.success) {
    //   return ctx.json(
    //     { success: false, error: { code: 400, message: result.error.message } },
    //     400
    //   );
    // }
    const createResult = await projectService.create(data);
    if (createResult.success === true) {
      return ctx.json(createResult, 201);
    } else {
      return ctx.json(createResult, 400);
    }
  });

  // Route to update a project
  app.patch("/:id", async (ctx) => {
    const id = ctx.req.param("id") as UUID;
    const data = await ctx.req.json();
    const result = projectSchema.safeParse(data);
    if (!result.success) {
      return ctx.json(
        { success: false, error: { code: 400, message: result.error.message } },
        400
      );
    }
    const updateResult = await projectService.update(id, result.data);
    if (updateResult.success === true) {
      return ctx.json(updateResult.data, 204);
    } else {
      return ctx.json({ success: false, error: updateResult.error }, 400);
    }
  });

  // Route to delete a project
  app.delete("/:id", async (ctx) => {
    const id = ctx.req.param("id") as UUID;
    const result = await projectService.remove(id);
    if (result.success === true) {
      return ctx.body(null, 204);
    } else {
      return ctx.json(result, 400);
    }
  });

  // Route to publish a project by id
  app.patch("/:id/publish", async (ctx) => {
    const id = ctx.req.param("id") as UUID;
    const result = await projectService.publish(id);
    if (result.success === true) {
      return ctx.json(result.data, 204);
    } else {
      return ctx.json(result, 400);
    }
  });

  // Route to unpublish a project by id
  app.patch("/:id/unpublish", async (ctx) => {
    const id = ctx.req.param("id") as UUID;
    const result = await projectService.unpublish(id);
    if (result.success === true) {
      return ctx.json(result.data, 204);
    } else {
      return ctx.json(result, 400);
    }
  });

  return app;
};

// Create a project controller
export const projectController = createProjectController(projectService);
