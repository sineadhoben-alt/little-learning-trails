import {sha256} from '@noble/hashes/sha256';
import {bytesToHex,utf8ToBytes} from '@noble/hashes/utils';
export const PARENT_KEY='@learning-trails/parent-access/v1';
export type ParentAccess={version:1;digest:string;failures:number;retryAfter:number};
export const validPIN=(pin:string)=>/^\d{6}$/.test(pin);
const digest=(pin:string)=>bytesToHex(sha256(utf8ToBytes(`learning-trails-parent-v1:${pin}`)));
export function createParentAccess(pin:string):ParentAccess {
 if(!validPIN(pin))throw Error('Use six digits.');
 return {version:1,digest:digest(pin),failures:0,retryAfter:0};
}
export function parseParentAccess(raw:string):ParentAccess {
 const p=JSON.parse(raw);
 if(p.version!==1||!/^[a-f0-9]{64}$/.test(p.digest)||!Number.isInteger(p.failures)||p.failures<0||!Number.isFinite(p.retryAfter)||p.retryAfter<0)throw Error('Parent access could not be read.');
 return p;
}
export function checkParentAccess(p:ParentAccess,pin:string,now=Date.now()):{allowed:boolean;record:ParentAccess}{
 if(now<p.retryAfter)return {allowed:false,record:p};
 if(validPIN(pin)&&digest(pin)===p.digest)return {allowed:true,record:{...p,failures:0,retryAfter:0}};
 const failures=p.failures+1;
 return {allowed:false,record:{...p,failures,retryAfter:failures>=5?now+60_000:0}};
}
