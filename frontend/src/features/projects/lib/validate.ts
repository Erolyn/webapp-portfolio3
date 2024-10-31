import { z } from 'zod';
import { ProjectProps } from '../types';

const projectSchema = z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    });

export const validateProject = (project: ProjectProps) => {
    try {
        projectSchema.parse(project);
        return true;
    } catch (error) {
        console.error('Error validating project:', error);
        return false;
    }
}

export default validateProject;
export { projectSchema };

