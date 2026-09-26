import test from 'node:test';import assert from 'node:assert/strict';
import {createParentAccess,checkParentAccess,parseParentAccess} from '../src/parentAccess.ts';
test('Parent PIN uses a digest, validates input and retains cooldown across reload',()=>{
 const pin='682941';let p=createParentAccess(pin);assert.ok(!JSON.stringify(p).includes(pin));assert.equal(checkParentAccess(p,pin,1000).allowed,true);
 assert.throws(()=>createParentAccess('123'));assert.throws(()=>parseParentAccess('{}'));
 for(let i=0;i<5;i++){const r=checkParentAccess(p,'111111',1000);assert.equal(r.allowed,false);p=r.record;}
 p=parseParentAccess(JSON.stringify(p));assert.equal(checkParentAccess(p,pin,1001).allowed,false);assert.equal(checkParentAccess(p,pin,61000).allowed,true);
});
