import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh,parseState,blankDraft,suggestedLevel} from '../src/model.ts';
import {createProgressPersistence} from '../src/persistence.ts';
import {coverage} from '../src/coverage.ts';
import {projects} from '../src/projects.ts';
import {learning,tasksForStep} from '../src/learning.ts';
import {activities} from '../src/content.ts';
import {readingLibrary} from '../src/englishProjects.ts';
const projectDraft=()=>({notes:'My revised explanation',rows:[['Category','Frequency'],['Birds','3'],['Trees','6']],versions:[{text:'My first prediction',at:'2026-09-26T09:00:00Z'}],stage:0,checks:[0],rating:'developing',points:[{x:0,y:10}],art:[{shape:'triangle',x:4,y:6,label:'Mountain'}]});
test('All 88 mapped areas provide concrete projects, resources, guidance and observable criteria',()=>{
 assert.equal(coverage.length,88);assert.deepEqual(Object.keys(projects).sort(),coverage.map(r=>r.id).sort());
 for(const row of coverage){const p=projects[row.id];assert.equal(p.source,row.source,row.id);for(const field of ['title','goal','model'])assert.ok(p[field]?.trim().length>15,`${row.id} ${field}`);for(const field of ['materials','steps','evidence'])assert.ok(p[field].length,`${row.id} ${field}`);for(const band of ['support','developing','secure'])assert.ok(p.rubric[band]?.length>20,`${row.id} ${band}`);if(p.stages)assert.ok(p.stages.length>=2);if(p.starterRows)assert.ok(p.starterRows.every(r=>r.length<=6&&r.every(v=>v.length<=300)));}
});
test('Every practice step has a worked example and anchored review criteria',()=>{for(const a of activities){assert.ok(learning[a.id],a.id);assert.equal(learning[a.id].steps.length,3);for(const step of learning[a.id].steps){assert.ok(step.focus);assert.ok(step.example.prompt&&step.example.reasoning&&step.example.answer);assert.ok(step.rubric.support&&step.rubric.developing&&step.rubric.secure);}for(let l=0;l<3;l++){const bank=tasksForStep(a.id,l);for(const t of bank){assert.ok(t.prompt&&t.hint&&t.explanation,a.id);if(t.options)assert.equal(t.options.filter(x=>x===t.answer).length,1,a.id);}}}});
test('Original reading library includes eight sustained texts and varied genres',()=>{assert.equal(readingLibrary.length,8);assert.ok(new Set(readingLibrary.map(t=>t.genre)).size>=5);for(const t of readingLibrary){const n=t.text.trim().split(/\s+/).length;assert.ok(n>=250&&n<=400,`${t.title}: ${n} words`);}});
test('Project versions, tables, diagrams and reviews survive saving and reopening alongside existing records',async()=>{
 const s=fresh();s.projects={EW9:projectDraft()};s.lastProject='EW9';s.drafts['story:0']={...blankDraft(),answer:'Keep this original story'};
 let stored=JSON.stringify(s);const storage={getItem:async()=>stored,setItem:async(k,v)=>{stored=v;}};const service=createProgressPersistence(storage,()=>{});
 assert.deepEqual(await service.load(),s);const revised=structuredClone(s);revised.projects.EW9.notes='Next revision';assert.equal(await service.save(revised),true);assert.deepEqual(await service.load(),revised);assert.equal(s.projects.EW9.notes,'My revised explanation');
 const failing=createProgressPersistence({...storage,setItem:async()=>{throw Error('Full');}},()=>{});assert.equal(await failing.save(s),false);assert.deepEqual(parseState(stored),revised);
});
test('Malformed project data is rejected without losing or rewriting existing records',()=>{const s=fresh();s.projects={EW9:projectDraft()};const bad=[{notes:3},{rows:[['x'.repeat(301)]]},{versions:Array(21).fill({text:'a',at:'2026-09-26'})},{stage:-1},{stage:99},{points:[{x:11,y:0}]},{art:[{shape:'script',x:1,y:1,label:'x'}]},{rating:'approved'}];for(const patch of bad){const raw=JSON.stringify({...s,projects:{EW9:{...projectDraft(),...patch}}});assert.throws(()=>parseState(raw));}assert.throws(()=>parseState(JSON.stringify({...s,lastProject:'UNKNOWN'})));assert.deepEqual(parseState(JSON.stringify(fresh())),fresh());});
test('Repeated answers do not raise difficulty; distinct independent answers do and unsuccessful drafts step down',()=>{const s=fresh();const r={activity:'shop',level:1,attempts:1,assisted:false,mode:'checked',practiceId:'shop:1:0',at:'2026-09-26T10:00:00Z'};s.results['shop:1']=r;s.history=[r,r,r];assert.equal(suggestedLevel(s,'shop'),1);s.history=[0,1,2].map((i)=>({...r,practiceId:`shop:1:${i}`,at:`2026-09-26T10:0${i}:00Z`}));assert.equal(suggestedLevel(s,'shop'),2);s.history[2].assisted=true;assert.equal(suggestedLevel(s,'shop'),1);s.last='shop:1';s.drafts['shop:1']={...blankDraft(),tries:3};assert.equal(suggestedLevel(s,'shop'),0);});
test('11 and 12 extension includes every additional ordered product and inverse through 12×12',()=>{
 const products=tasksForStep('tables',1).filter(t=>t.prompt.startsWith('Extra table practice:'));
 const divisions=tasksForStep('tables',2).filter(t=>t.prompt.startsWith('Extra related division:'));
 assert.equal(products.length,44);assert.equal(divisions.length,44);
 for(let factor=1;factor<=12;factor++)for(let groups=1;groups<=12;groups++){
  if(factor<=10&&groups<=10)continue;
  const p=products.find(t=>t.prompt===`Extra table practice: ${factor} × ${groups} = ?`);
  const d=divisions.find(t=>t.prompt===`Extra related division: ${factor*groups} ÷ ${factor} = ?`);
  assert.equal(p?.answer,factor*groups);assert.equal(d?.answer,groups);
 }
});
