import test from 'node:test';
import assert from 'node:assert/strict';
import {activities} from '../src/content.ts';
import {tasksForStep} from '../src/learning.ts';
import {blankDraft,checkAnswer} from '../src/model.ts';
import {englishCandidates,markEnglish,englishQuestionSignature} from '../src/englishCheck.ts';
import signatures from '../src/englishQuestionSignatures.ts';
const cases=activities.filter(a=>a.subject==='English').flatMap(a=>[0,1,2].flatMap(level=>tasksForStep(a.id,level).filter(t=>t.answer!==undefined).map(t=>({id:a.id,kind:a.kind,level,t}))));
const draft=t=>({...blankDraft(),answer:String(t.answer),words:t.words?String(t.answer).split(' ').map(w=>t.words.indexOf(w)):[]});
const permutations=xs=>xs.length?xs.flatMap((x,i)=>permutations(xs.filter((_,j)=>j!==i)).map(t=>[x,...t])):[[]];
test('All 91 English closed items have exactly one independently supported answer',()=>{
 assert.equal(cases.length,91);assert.equal(new Set(signatures).size,91);
 for(const {id,level,t} of cases){assert.ok(signatures.includes(englishQuestionSignature(id,level,t)));const r=englishCandidates(id,level,{...t,answer:undefined});assert.equal(r.answers.length,1,`${id}: ${t.prompt}`);assert.equal(r.answers[0],t.answer);assert.ok(r.reason.length>40);assert.equal(markEnglish(id,level,t,draft(t)).status,'correct');}
});
test('Every offered English option is graded against evidence, regardless of display order',()=>{
 for(const {id,kind,level,t} of cases){assert.ok(checkAnswer(kind,t,draft(t)));if(!t.options)continue;
  for(const options of permutations(t.options))for(const answer of options)assert.equal(markEnglish(id,level,{...t,options},{...blankDraft(),answer}).status,answer===t.answer?'correct':'incorrect',`${id}: ${answer}`);
 }
});
test('All word-tile permutations have precisely one correct sequence; incomplete selections are not penalised',()=>{
 for(const {id,level,t} of cases.filter(v=>v.t.words)){let correct=0;for(const words of permutations(t.words.map((_,i)=>i))){const r=markEnglish(id,level,t,{...blankDraft(),words});if(r.status==='correct')correct++;else assert.equal(r.status,'incorrect');}assert.equal(correct,1);assert.equal(markEnglish(id,level,t,blankDraft()).status,'incomplete');assert.equal(markEnglish(id,level,t,{...draft(t),words:t.words.map(()=>0)}).status,'incomplete');}
});
test('English corrupted keys, changed evidence, ambiguous or duplicate options cannot mark a child wrong',()=>{
 for(const {id,level,t} of cases){const d=draft(t);assert.equal(markEnglish(id,level,{...t,answer:'Broken key'},d).status,'grader-error');
  for(const field of ['prompt','hint','explanation','passage'])assert.equal(markEnglish(id,level,{...t,[field]:(t[field]||'')+' changed'},d).status,'grader-error');
  if(t.options)assert.equal(markEnglish(id,level,{...t,options:[...t.options,t.answer]},d).status,'grader-error');
 }
});
test('Open-ended tasks never enter an automatic single-answer grader',()=>{
 let count=0;for(const a of activities)for(let level=0;level<3;level++)for(const t of tasksForStep(a.id,level)){if(t.answer!==undefined){assert.equal(t.checklist,undefined);continue;}count++;assert.ok(t.checklist?.length);assert.equal(checkAnswer(a.kind,t,blankDraft()),false);}assert.equal(count,84);
});
test('Closed questions preserve the scope of text evidence and explicit punctuation conventions',()=>{
 const compost=activities.find(a=>a.id==='reading-library').tasks[2];assert.match(compost.answer,/helps/);assert.doesNotMatch(compost.answer,/needs/);
 for(const t of tasksForStep('grammar',2))assert.match(t.prompt,/one comma immediately before so and no comma after/);
 const shadow=tasksForStep('reading-library',2)[3];assert.match(shadow.answer,/In this investigation/);
});
