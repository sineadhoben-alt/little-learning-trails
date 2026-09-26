import test from 'node:test';
import assert from 'node:assert/strict';
import {activities} from '../src/content.ts';
import {fresh,blankDraft,changeBasketCount,parseState} from '../src/model.ts';
import {createProgressPersistence,PROGRESS_KEY} from '../src/persistence.ts';
const memory=(initial=null)=>({raw:initial,writes:0,fail:false,async getItem(){return this.raw;},async setItem(key,value){assert.equal(key,PROGRESS_KEY);if(this.fail)throw Error('Storage unavailable');this.raw=value;this.writes++;}});
function family(){const s=fresh();s.nickname='Robin';s.onboarded=true;s.year='P7';s.business.description='Family business settings';s.drafts['story:0']={...blankDraft(),plan:'A lighthouse',answer:'My unfinished story',checks:[0]};s.results['data:0']={activity:'data',level:0,attempts:1,assisted:false,mode:'checked',at:'2026-09-26T12:00:00Z'};s.history=[s.results['data:0']];return s;}

test('All shop item orders, levels and intermediate edits reopen without losing other work',async()=>{
 for(let level=0;level<3;level++)for(const order of [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]]){
  const s=family(), key=`shop:${level}`,storage=memory(),p=createProgressPersistence(storage,()=>{});let d=blankDraft();
  const itemCount=activities.find(a=>a.id==='shop').tasks[level].items.length;
  for(const index of order)for(const delta of [1,1,-1]){
   d={...d,counts:changeBasketCount(d.counts,itemCount,index,delta)};s.drafts[key]=d;s.last=key;
   assert.equal(await p.save(s),true);const restored=await p.load();
   assert.deepEqual(restored,s);assert.equal(d.counts.length,itemCount);assert.ok(d.counts.every(Number.isInteger));
  }
 }
});
test('Legacy null basket slots recover at every level and preserve all unrelated fields',async()=>{
 for(let level=0;level<3;level++)for(const counts of [[null,1],[null,null,1],[2,null,1],[]]){
  const s=family(),key=`shop:${level}`;s.drafts[key]={...blankDraft(),counts,answer:'3.50',hint:true,tries:2,feedback:'Try again'};s.last=key;
  const raw=JSON.stringify(s),storage=memory(raw),p=createProgressPersistence(storage,()=>{});
  const repaired=await p.load();assert.equal(storage.raw,raw);assert.equal(storage.writes,0);
  const expected=structuredClone(s);expected.drafts[key].counts=Array.from({length:3},(_,i)=>counts[i]??0);
  assert.deepEqual(repaired,expected);assert.deepEqual(parseState(JSON.stringify(repaired)),repaired);
  assert.equal(await p.save(repaired),true);assert.deepEqual(await p.load(),expected);
 }
});
test('Unrelated malformed data is not silently repaired or overwritten',async()=>{
 const cases=[];
 for(const counts of [[-1],[1.5],['1'],[11],[0,0,0,null]]){const s=family();s.drafts['shop:0']={...blankDraft(),counts};cases.push(JSON.stringify(s));}
 const nonshop=family();nonshop.drafts['story:0'].checks=[null];cases.push(JSON.stringify(nonshop));
 const unknown=family();unknown.drafts['not-a-task:0']={...blankDraft(),counts:[null,1]};cases.push(JSON.stringify(unknown));
 const mixed=family();mixed.drafts['shop:0']={...blankDraft(),counts:[null,1]};mixed.drafts['story:0'].answer=null;cases.push(JSON.stringify(mixed),'invalid JSON');
 for(const raw of cases){const storage=memory(raw),p=createProgressPersistence(storage,()=>{});await assert.rejects(p.load());assert.equal(storage.raw,raw);assert.equal(storage.writes,0);}
 const storage={async getItem(){throw Error('Read failed');},async setItem(){assert.fail('Must not write after failed read');}};
 await assert.rejects(createProgressPersistence(storage,()=>{}).load());
});
test('Rejected saves preserve the previous record and retry saves the latest full snapshot',async()=>{
 const old=family(),storage=memory(JSON.stringify(old)),messages=[],p=createProgressPersistence(storage,m=>messages.push(m));
 const next=structuredClone(old);next.drafts['story:0'].answer+=' and a new paragraph';storage.fail=true;
 assert.equal(await p.save(next),false);assert.deepEqual(await p.load(),old);assert.equal(messages.at(-1),'Could not save. Please retry.');
 storage.fail=false;assert.equal(await p.save(next),true);assert.deepEqual(await p.load(),next);assert.equal(messages.at(-1),'Saved on this device');
 const invalid=structuredClone(next);invalid.drafts['story:0'].answer=null;
 assert.equal(await p.save(invalid),false);assert.deepEqual(await p.load(),next);
});
test('Queued edits retain order, snapshot values and do not announce stale completion',async()=>{
 let release;const gate=new Promise(resolve=>release=resolve);const writes=[],messages=[];
 const storage={async getItem(){return null;},async setItem(_key,value){if(writes.length===0){writes.push(value);await gate;}else writes.push(value);}};
 const p=createProgressPersistence(storage,m=>messages.push(m));const s=family();const one=p.save(s);await Promise.resolve();
 s.nickname='Wren';const two=p.save(s);s.nickname='Not queued';release();assert.equal(await one,true);assert.equal(await two,true);
 assert.deepEqual(writes.map(raw=>JSON.parse(raw).nickname),['Robin','Wren']);assert.equal(messages.filter(m=>m==='Saved on this device').length,1);
});
