import {activities,type Level} from './content.ts';
import {mathsLearning,mathsPractice} from './mathsLearning.ts';
import {englishLearning,englishPractice,englishAccessGuidance} from './englishLearning.ts';
export const learning={...mathsLearning,...englishLearning};
export const practice={...mathsPractice,...englishPractice};
export const accessGuidance=englishAccessGuidance;
export const tasksForStep=(id:string,level:Level)=>[activities.find(a=>a.id===id)!.tasks[level],...(practice[`${id}:${level}`]||[])];
