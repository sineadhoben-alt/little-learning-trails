import type {Activity,Task} from './content';
export const number=(prompt:string,answer:number,hint:string,explanation:string):Task=>({prompt,answer,hint,explanation});
export const choice=(prompt:string,options:string[],answer:string,hint:string,explanation:string,passage?:string):Task=>({prompt,options,answer,hint,explanation,passage});
export const practical=(prompt:string,hint:string,checklist:string[],explanation:string):Task=>({prompt,hint,checklist,explanation});
export function trail(id:string,title:string,subject:'Maths'|'English',strand:string,objective:string,tasks:Task[],kind:Activity['kind']='practice'):Activity{return {id,title,subject,strand,objective,tasks,kind,source:subject==='Maths'?'maths':'english',icon:subject==='Maths'?'✳':'✎',colour:subject==='Maths'?'#DCEBEA':'#E2E3F6',description:objective};}
