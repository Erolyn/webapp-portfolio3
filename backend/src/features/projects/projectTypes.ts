import { z } from "zod";
import { projectSchema } from "./projectValidate";

// Type for project data in application
export type Project = z.infer<typeof projectSchema>;
