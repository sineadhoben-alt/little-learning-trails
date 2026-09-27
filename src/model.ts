import {tasksForStep} from './learning.ts';
import {markMaths} from './mathsCheck.ts';
import {markEnglish} from './englishCheck.ts';
import {projects} from './projects.ts';
import {coverage} from './coverage.ts';
import type {ProjectDraft} from './ProjectWorkspace';
import { activities, type Level, type Task } from './content.ts';
export type Draft = {answer:string;counts:number[];width:number;height:number;tiles:number[];words:number[];checks:number[];hint:boolean;tries:number;feedback:string;solved:boolean;plan:string;practiceIndex?:number;exampleSeen?:boolean};
export type Result = {activity:string;level:Level;attempts:number;assisted:boolean;mode:'checked'|'reflection';at:string; adultRating?:'support'|'developing'|'secure';practiceId?:string};
export type State = {version:1;projects?:Record<string,ProjectDraft>;lastProject?:string;history?:Result[];onboarded:boolean;nickname:string;year:string;results:Record<string,Result>;drafts:Record<string,Draft>;last:string|null;business:{name:string;description:string;url:string;verified:boolean;androidURL?:string;androidVerified?:boolean}};
export const fresh = ():State => ({version:1,onboarded:false,nickname:'',year:'P5',results:{},drafts:{},last:null,business:{name:'Transfer Trainer NI',description:'Supporting families on their learning journey. More information about our services will be added here.',url:'',verified:false}});
export const blankDraft = ():Draft => ({answer:'',counts:[],width:1,height:1,tiles:[],words:[],checks:[],hint:false,tries:0,feedback:'',solved:false,plan:''});
export const keyFor=(id:string,level:Level)=>`${id}:${level}`;
// Always materialise every slot: JSON turns sparse-array holes into null.
export function changeBasketCount(counts:number[],itemCount:number,index:number,delta:number):number[] {
 return Array.from({length:itemCount},(_,i)=>Math.max(0,Math.min(10,(counts[i]??0)+(i===index?delta:0))));
}
export function suggestedLevel(state:State,id:string):Level {
 const last=state.last?.split(':');
 if(last?.[0]===id){const d=state.drafts[state.last!];if(d&&!d.solved&&d.tries>=3)return Math.max(0,Number(last[1])-1) as Level;}
 const results=Object.values(state.results).filter(r=>r.activity===id && (r.mode==='checked'||r.adultRating)).sort((a,b)=>b.at.localeCompare(a.at));
 if(!results.length) return 0;
 const recent=results[0];
 if(recent.adultRating==='secure')return Math.min(2,recent.level+1) as Level;
 if(recent.adultRating==='developing')return recent.level;
 if(recent.adultRating==='support')return Math.max(0,recent.level-1) as Level;
 if(recent.attempts>=3) return Math.max(0,recent.level-1) as Level;
 // Replaying one revealed answer is not new evidence. Require three different
 // recent items at this step, independently completed, before suggesting up.
 const unique=new Map<string,Result>();
 for(const r of [...(state.history||[]),...results].filter(r=>r.activity===id&&r.level===recent.level&&r.mode==='checked').sort((a,b)=>b.at.localeCompare(a.at))){const key=r.practiceId||`${r.activity}:${r.level}:0`;if(!unique.has(key))unique.set(key,r);}
 const evidence=[...unique.values()].slice(0,3);
 const ready=evidence.length===3&&evidence.every(r=>r.attempts===1&&!r.assisted);
 return Math.min(2,recent.level+(ready?1:0)) as Level;
}
const taskContexts=new Map<Task,{id:string;level:Level;subject:string}>();
for(const a of activities)for(const level of [0,1,2] as Level[])for(const task of tasksForStep(a.id,level))taskContexts.set(task,{id:a.id,level,subject:a.subject});
export function checkAnswer(_kind:string,task:Task,d:Draft):boolean {
 const context=taskContexts.get(task);
 if(!context||task.answer===undefined)return false;
 const mark=context.subject==='Maths'?markMaths(context.id,context.level,task,d):markEnglish(context.id,context.level,task,d);
 return mark.status==='correct';
}
export const safeURL=(url:string)=> {try{const u=new URL(url);return u.protocol==='https:'&&!u.username&&!u.password&&u.hostname.includes('.');}catch{return false;}};
export function parseState(raw:string):State {
 const s=JSON.parse(raw);
 if(s.version!==1 || typeof s.onboarded!=='boolean'||typeof s.nickname!=='string'||!['P5','P6','P7'].includes(s.year)||!s.results||!s.drafts||!(s.last===null||typeof s.last==='string')||typeof s.business?.name!=='string'||typeof s.business?.description!=='string'||typeof s.business?.url!=='string'||typeof s.business?.verified!=='boolean')throw Error('Unrecognised saved progress');
 const validKey=(k:string)=>activities.some(a=>[0,1,2].some(l=>k===`${a.id}:${l}`));
 if(s.last!==null&&!validKey(s.last))throw Error('Invalid resume point');
 // Repair only the known v1 shop representation. JSON parsing makes a fresh
 // object, so an unsuccessful validation never mutates the stored record.
 for(const [k,d] of Object.entries(s.drafts) as [string,Draft][]){
  const shop=activities.find(a=>a.kind==='shop'&&a.tasks.some((_,i)=>k===keyFor(a.id,i as Level)));
  if(!shop)continue;
  const itemCount=shop.tasks[Number(k.split(':')[1])].items!.length;
  if(!Array.isArray(d?.counts)||d.counts.length>itemCount||!d.counts.every(v=>v===null||(Number.isInteger(v)&&v>=0&&v<=10)))throw Error('Invalid basket draft');
  d.counts=Array.from({length:itemCount},(_,i)=>d.counts[i]??0);
 }
 for(const [k,r] of Object.entries(s.results) as [string,Result][]){if(!validKey(k)||k!==keyFor(r.activity,r.level)||!Number.isInteger(r.attempts)||r.attempts<1||!['checked','reflection'].includes(r.mode)||typeof r.at!=='string'||!Number.isFinite(Date.parse(r.at))||typeof r.assisted!=='boolean')throw Error('Invalid result');}
 for(const [k,d] of Object.entries(s.drafts) as [string,Draft][]){if(!validKey(k)||typeof d.answer!=='string'||typeof d.plan!=='string'||typeof d.feedback!=='string'||typeof d.solved!=='boolean'||typeof d.hint!=='boolean'||!Number.isInteger(d.tries)||d.tries<0||![d.width,d.height].every(v=>Number.isInteger(v)&&v>=1&&v<=8)||![d.counts,d.tiles,d.words,d.checks].every(a=>Array.isArray(a)&&a.every(v=>Number.isInteger(v)&&v>=0&&v<=30)))throw Error('Invalid activity draft');}
 if(s.business.androidURL!==undefined&&typeof s.business.androidURL!=='string')throw Error('Invalid store link');
 if(s.business.androidVerified!==undefined&&typeof s.business.androidVerified!=='boolean')throw Error('Invalid store verification');
 if(s.history!==undefined&&(!Array.isArray(s.history)||s.history.length>5000))throw Error('Invalid learning history');
 for(const r of [...Object.values(s.results),...(s.history||[])] as Result[]){if(!r||!validKey(keyFor(r.activity,r.level))||!Number.isInteger(r.attempts)||r.attempts<1||!['checked','reflection'].includes(r.mode)||typeof r.assisted!=='boolean'||typeof r.at!=='string'||!Number.isFinite(Date.parse(r.at))||(r.adultRating!==undefined&&!['support','developing','secure'].includes(r.adultRating))||(r.practiceId!==undefined&&(typeof r.practiceId!=='string'||!new RegExp(`^${r.activity}:${r.level}:\\d+$`).test(r.practiceId))))throw Error('Invalid learning result');}
 for(const d of Object.values(s.drafts) as Draft[]){if(d.practiceIndex!==undefined&&(!Number.isInteger(d.practiceIndex)||d.practiceIndex<0||d.practiceIndex>10000))throw Error('Invalid practice index');if(d.exampleSeen!==undefined&&typeof d.exampleSeen!=='boolean')throw Error('Invalid example state');}
 const projectID=(id:string)=>coverage.some(row=>row.id===id);
 if(s.lastProject!==undefined&&(typeof s.lastProject!=='string'||!projectID(s.lastProject)))throw Error('Invalid project resume point');
 if(s.projects!==undefined){
  if(!s.projects||typeof s.projects!=='object'||Array.isArray(s.projects))throw Error('Invalid saved projects');
  for(const [id,d] of Object.entries(s.projects) as [string,ProjectDraft][]){
   if(!projectID(id)||!d||typeof d.notes!=='string'||d.notes.length>10000||!Array.isArray(d.rows)||d.rows.length>50||!d.rows.every(row=>Array.isArray(row)&&row.length<=6&&row.every(cell=>typeof cell==='string'&&cell.length<=300))||!Array.isArray(d.versions)||d.versions.length>20||!d.versions.every(v=>v&&typeof v.text==='string'&&v.text.length<=10000&&typeof v.at==='string'&&Number.isFinite(Date.parse(v.at)))||!Number.isInteger(d.stage)||d.stage<0||d.stage>=Math.max(1,projects[id].stages?.length||0)||!Array.isArray(d.checks)||!d.checks.every(v=>Number.isInteger(v)&&v>=0&&v<projects[id].evidence.length)||(d.rating!==undefined&&!['support','developing','secure'].includes(d.rating)))throw Error('Invalid project draft');
   const coordinate=(v:any)=>v&&[v.x,v.y].every(n=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=10);
   if(d.points!==undefined&&(!Array.isArray(d.points)||d.points.length>50||!d.points.every(coordinate)))throw Error('Invalid saved coordinates');
   if(d.art!==undefined&&(!Array.isArray(d.art)||d.art.length>20||!d.art.every(v=>coordinate(v)&&['circle','square','triangle'].includes(v.shape)&&typeof v.label==='string'&&v.label.length<=80)))throw Error('Invalid saved composition');
  }
 }
 return s as State;
}
