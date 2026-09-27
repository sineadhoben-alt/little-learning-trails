import test from 'node:test';
import assert from 'node:assert/strict';
import {activities} from '../src/content.ts';
import {tasksForStep} from '../src/learning.ts';
import {blankDraft,checkAnswer,fresh,parseState} from '../src/model.ts';
import {deriveMathsAnswer,markMaths,numericResponse,mathsQuestionSignature} from '../src/mathsCheck.ts';
import checked from '../src/mathsQuestionSignatures.ts';
const cases=activities.filter(a=>a.subject==='Maths').flatMap(a=>[0,1,2].flatMap(level=>tasksForStep(a.id,level).filter(t=>t.answer!==undefined).map(t=>({id:a.id,kind:a.kind,level,t}))));
const draft=t=>({...blankDraft(),answer:String(t.answer),width:t.width||1,height:t.height||1,counts:t.items?.map(v=>v.quantity)||[],tiles:Array.from({length:t.total?Number(t.answer):0},(_,i)=>i)});

test('Every closed maths item has a separate hint-method calculation and frozen question inputs',()=>{
 assert.equal(cases.length,640);
 assert.equal(new Set(checked).size,640);
 for(const {id,level,t} of cases){
  assert.ok(checked.includes(mathsQuestionSignature(id,level,t)),`${id}: ${t.prompt}`);
  const independent=deriveMathsAnswer(id,level,{...t,answer:undefined,explanation:''});
  if(typeof independent==='number')assert.ok(Math.abs(independent-t.answer)<1e-8,`${id}: ${t.prompt}`);else assert.equal(independent,t.answer,`${id}: ${t.prompt}`);
 }
});
test('Every maths item accepts a correct response and rejects a wrong one only when checks agree',()=>{
 for(const {id,kind,level,t} of cases){const d=draft(t);
  assert.equal(markMaths(id,level,t,d).status,'correct',`${id}: ${t.prompt}`);
  assert.equal(checkAnswer(kind,t,d),true,`${id}: public grading path`);
  const wrong=typeof t.answer==='number'?String(t.answer+1):t.options.find(v=>v!==t.answer);
  assert.equal(markMaths(id,level,t,{...d,answer:wrong}).status,'incorrect',`${id}: ${t.prompt}`);
 }
});
test('Corrupt answer keys and changed guidance fail safely for all 640 items',()=>{
 for(const {id,level,t} of cases){const d=draft(t),badKey=typeof t.answer==='number'?t.answer+1:'Broken key';
  for(const answer of [String(t.answer),String(badKey),'another response'])assert.equal(markMaths(id,level,{...t,answer:badKey},{...d,answer}).status,'grader-error',id);
  for(const field of ['prompt','hint','explanation'])assert.equal(markMaths(id,level,{...t,[field]:t[field]+' Changed.'},d).status,'grader-error',`${id}:${field}`);
 }
});
test('Reported regression: 4 m by 2 m drawing and 8 m² is acknowledged, never marked wrong',()=>{
 const t=activities.find(a=>a.id==='garden').tasks[0];
 const d={...blankDraft(),width:4,height:2,answer:'8',tries:0};
 const result=markMaths('garden',0,t,d);
 assert.equal(result.status,'incomplete');assert.match(result.feedback,/area is correct for your 4 m by 2 m drawing/);assert.match(result.feedback,/3 m wide and 2 m high/);
 assert.equal(d.tries,0);assert.equal(d.answer,'8');
 const saved=fresh();saved.drafts['garden:0']=d;assert.deepEqual(parseState(JSON.stringify(saved)).drafts['garden:0'],d);
});
test('Correct target answer is acknowledged when garden controls are unfinished or rotated',()=>{
 const t=activities.find(a=>a.id==='garden').tasks[0];
 assert.match(markMaths('garden',0,t,{...blankDraft(),answer:'6'}).feedback,/number answer is correct/);
 assert.equal(markMaths('garden',0,t,{...blankDraft(),width:2,height:3,answer:'6'}).status,'correct');
 assert.equal(markMaths('garden',0,t,{...draft(t),answer:'6.000'}).status,'correct');
});
test('Perimeter and pond checks use the current drawing for construction feedback',()=>{
 const ts=activities.find(a=>a.id==='garden').tasks;
 assert.match(markMaths('garden',1,ts[1],{...blankDraft(),width:4,height:2,answer:'12'}).feedback,/perimeter is correct/);
 assert.match(markMaths('garden',2,ts[2],{...blankDraft(),width:4,height:2,answer:'6'}).feedback,/area is correct/);
});
test('Incomplete baskets and tile models receive specific feedback, not a wrong maths mark',()=>{
 for(const id of ['shop','fractions']){const t=activities.find(a=>a.id===id).tasks[0];const result=markMaths(id,0,t,{...blankDraft(),answer:String(t.answer)});assert.equal(result.status,'incomplete');assert.match(result.feedback,/answer is correct/);}
 const t=activities.find(a=>a.id==='fractions').tasks[0];
 for(const tiles of [[0,0,0,0],[0,1,2,99]])assert.equal(markMaths('fractions',0,t,{...draft(t),tiles}).status,'incomplete');
});
test('Equivalent decimal notation is accepted; malformed input is not an unsuccessful maths attempt',()=>{
 for(const s of ['8','8.0','8.000','+8',' 8 '])assert.equal(numericResponse(s),8);
 for(const s of ['',' ','8abc','8,00','NaN','Infinity','0x8','8 m²','1/2'])assert.equal(numericResponse(s),undefined);
 const t=activities.find(a=>a.id==='garden').tasks[0];
 assert.equal(markMaths('garden',0,t,{...draft(t),answer:''}).status,'incomplete');
});
test('Damaged structured question inputs fail closed before computation',()=>{
 const shop=activities.find(a=>a.id==='shop').tasks[0];
 assert.equal(markMaths('shop',0,{...shop,items:[{...shop.items[0],quantity:-1}]},draft(shop)).status,'grader-error');
 const garden=activities.find(a=>a.id==='garden').tasks[0];
 assert.equal(markMaths('garden',0,{...garden,width:4,answer:8},{...draft(garden),width:4,answer:'8'}).status,'grader-error');
 assert.equal(deriveMathsAnswer('garden',0,{...garden,width:4,height:2,answer:999}),8);
});

test('Exact owner report: 2 by 4 garden, one quarter pond, 6 m² remains in either orientation',()=>{
 const t=tasksForStep('garden',2)[1];
 assert.match(t.prompt,/2 m by 4 m rectangle/);assert.equal(t.answer,6);
 for(const [width,height] of [[2,4],[4,2]]){
  const d={...blankDraft(),width,height,answer:'6'};
  assert.equal(markMaths('garden',2,t,d).status,'correct');
  assert.equal(checkAnswer('garden',t,d),true);
  assert.equal(markMaths('garden',2,t,{...d,answer:'8'}).status,'incorrect');
 }
});
test('All garden questions accept a rotated rectangle with the same dimensions',()=>{
 for(const {id,level,t} of cases.filter(v=>v.id==='garden'))assert.equal(markMaths(id,level,t,{...draft(t),width:t.height,height:t.width}).status,'correct');
});
test('Every maths option is checked, with unchanged results when the offered order is reversed',()=>{
 for(const {id,level,t} of cases.filter(v=>v.t.options))for(const answer of t.options){const r=markMaths(id,level,{...t,options:[...t.options].reverse()},{...draft(t),answer});assert.equal(r.status,answer===t.answer?'correct':'incorrect',`${id}: ${answer}`);}
});
test('Sequential and precedence-sensitive questions reject common reordering mistakes',()=>{
 const cases=[['operations',0,10],['operations',2,2.3125],['machines',1,18],['machines',2,17/3],['unknown',2,26/3-5],['factors',2,1]];
 for(const [id,level,wrong] of cases){const t=tasksForStep(id,level)[0];assert.notEqual(wrong,t.answer);assert.equal(markMaths(id,level,t,{...blankDraft(),answer:String(wrong)}).status,'incorrect',id);}
});
test('A near-but-unequal decimal can never be accepted by a numeric tolerance',()=>{
 const t=tasksForStep('garden',0)[0];
 for(const answer of ['6.000000001','5.999999999','6.00000000000000001','6000000000000000001'])assert.notEqual(markMaths('garden',0,t,{...draft(t),answer}).status,'correct');
 assert.equal(markMaths('garden',0,{...t,answer:6.000000001},draft(t)).status,'grader-error');
});
