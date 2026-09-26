import {readdirSync,readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {activities} from '../src/content.ts';
import {learning,tasksForStep} from '../src/learning.ts';
import {projects} from '../src/projects.ts';
const hash=value=>createHash('sha256').update(value).digest('hex');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(`${dir}/${f.name}`):[`${dir}/${f.name}`]);
const files=[...walk('src'),...walk('assets'),...walk('plugins'),'app.json','package.json','pnpm-lock.yaml','index.js','tsconfig.json'].sort();
const list=files.map(path=>`${hash(readFileSync(path))}  ${path}`);
writeFileSync('docs/review/candidate-source-sha256.txt',list.join('\n')+'\n');
const rows=[];
for(const a of activities)for(let level=0;level<3;level++){
 tasksForStep(a.id,level).forEach((task,i)=>rows.push({id:`${a.id}:${level}:${i}`,kind:i?'practice variant':'anchor task',subject:a.subject,title:task.prompt,hash:hash(JSON.stringify(task))}));
 const example=learning[a.id].steps[level];rows.push({id:`example:${a.id}:${level}`,kind:'modelled step and rubric',subject:a.subject,title:example.focus,hash:hash(JSON.stringify(example))});
}
for(const [id,p] of Object.entries(projects))rows.push({id,kind:'guided project and rubric',subject:p.source,title:p.title,hash:hash(JSON.stringify(p))});
const register=['# Candidate per-item human approval register','','Version 0.2.0/build 2. All decisions pending. These item hashes identify actual content. Use coded reviewers with privately verified relevant expertise. Parent feedback and AI checks are not qualified curriculum approvals. Do not fill dates or approvals until the reviewer explicitly confirms the exact item/candidate.','','| Item | Kind | Subject | Content SHA-256 | Reviewer code | Decision | Date / private evidence reference |','|---|---|---|---|---|---|---|',...rows.map(r=>`| ${r.id} | ${r.kind} | ${r.subject} | ${r.hash} | — | Pending | — |`)];
writeFileSync('docs/evaluation/PER-ITEM-APPROVALS.md',register.join('\n')+'\n');
const manifest={name:'Little Learning Trails — Maths & English',version:'0.2.0',build:2,recordedAt:new Date().toISOString(),sourceManifestSHA256:hash(list.join('\n')+'\n'),sourceFiles:files.length,reviewItems:rows.length,decision:'HOLD: human review, supervised evaluation, physical-device/accessibility evidence and distribution permissions pending'};
for(const [key,path] of Object.entries({android:'releases/learning-trails-0.2.0-android.apk',iosSimulator:'releases/learning-trails-0.2.0-ios-simulator.zip'}))if(existsSync(path))manifest[key]={path,sha256:hash(readFileSync(path))};
writeFileSync('docs/review/candidate-manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(manifest);
