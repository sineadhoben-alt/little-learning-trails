import {englishProjects} from './englishProjects.ts';
import {mathsProjects} from './mathsProjects.ts';
import type {LearningProject} from './ProjectWorkspace';
export const projects:Record<string,LearningProject>={...mathsProjects,...englishProjects};
