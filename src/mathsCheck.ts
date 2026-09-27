import type {Task,Level} from './content';
import type {Draft} from './model';
import checkedQuestions from './mathsQuestionSignatures.ts';
const checked=new Set(checkedQuestions);
export const mathsQuestionSignature=(id:string,level:Level,t:Task)=>JSON.stringify([id,level,t.prompt,t.hint,t.explanation,t.options?[...t.options].sort():undefined,t.width,t.height,t.items,t.budget,t.total,t.parts,t.bars]);

const sum=(xs:number[])=>xs.reduce((a,b)=>a+b,0);
const numbers=(s:string)=>(s.replace(/(\d),(?=\d{3}(?:\D|$))/g,'$1').match(/\d+(?:\.\d+)?/g)||[]).map(Number);
const close=(a:number,b:number)=>Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<1e-8;
const equal=(a:unknown,b:unknown)=>a===b;
const unique=(options:string[]|undefined,predicate:(s:string)=>boolean)=>{const matches=options?.filter(predicate)||[];return matches.length===1?matches[0]:undefined;};
const prime=(n:number)=>n>=2&&Number.isInteger(n)&&!Array.from({length:Math.max(0,Math.floor(Math.sqrt(n))-1)},(_,i)=>i+2).some(d=>n%d===0);

/** Second route: derive from question quantities using the method in the hint.
 * Never reads task.answer or task.explanation. Unsupported questions fail closed.
 * Domain rules are deliberately separate from bank authoring calculations.
 */
export function deriveMathsAnswer(id:string,level:Level,t:Task):number|string|undefined {
 const p=t.prompt.toLowerCase(),ns=numbers(t.prompt),[a,b,c,d]=ns;
 const choose=(fn:(s:string)=>boolean)=>unique(t.options,fn);
 switch(id){
 case 'garden': {const w=t.width!,h=t.height!;if(!Number.isInteger(w)||!Number.isInteger(h)||w<1||h<1)return;
  // Count unit squares (rather than copying the multiplication answer key).
  const squares=sum(Array.from({length:h},()=>w));
  return level===0?squares:level===1?sum([w,h,w,h]):squares-squares/4;}
 case 'shop':if(!t.items||t.budget===undefined)return;return (t.budget-sum(t.items.flatMap(v=>Array.from({length:v.quantity},()=>v.price))))/100;
 case 'fractions':return t.total!/t.parts!;
 case 'data': {const values=t.bars?.map(v=>v.value);if(!values)return;return level===0?values[0]-values[1]:level===1?sum(values):sum(values)/values.length;}
 case 'place-value':if(level===0){const digits=String(b),position=digits.indexOf(String(a));return position<0?undefined:a*10**(digits.length-position-1);}if(level===1)return choose(s=>{const v=s.split(',').map(Number);return v.every((n,i)=>i===0||n>v[i-1]);});return sum(ns);
 case 'decimal-scaling':return level===2?a/b:a*b;
 case 'estimate':if(level===0)return Math.floor((a+5)/10)*10;if(level===1)return Math.floor((a+50)/100)*100+Math.floor((b+50)/100)*100;return choose(s=>{const v=numbers(s);return s.includes('×')&&v[0]===Math.round(a/10)*10&&v[1]===Math.round(b/10)*10&&v[2]===v[0]*v[1];});
 case 'negative':if(level===0){const temp=(s:string)=>Number(s.replace('−','-').replace('°C',''));const min=Math.min(...(t.options||[]).map(temp));return choose(s=>temp(s)===min);}if(level===1)return a+b;return choose(s=>Number(s.replace('Floor ','').replace('−','-'))===a-b);
 case 'sequences':return level===0?ns.at(-1)!+(ns[1]-ns[0]):level===1?ns.at(-1)!*2:undefined;
 case 'factors':if(level===0){let count=0;for(let f=1;f<=a;f++)if(a%f===0)count++;return count;}if(level===1)return choose(s=>prime(Number(s)));return a*a*a-b*b;
 case 'machines':if(level===0)return a+b;if(level===1)return b*2+a;return (c+b)/a;
 case 'unknown':return level===0?b-a:level===1?b/a:(c-b)/a;
 case 'mental':return p.includes('−')?a-b:a+b;
 case 'tables':if(p.includes('division')||p.includes('shared'))return a/b;if(p.startsWith('seven'))return 7*a;return sum(Array.from({length:a},()=>b));
 case 'operations':return level===0?(a+b)/c:level===1?sum([a,a,a]):a/b-c;
 case 'fraction-links':if(level===0)return choose(s=>{const v=numbers(s);return v[0]*2===v[1];});if(level===1)return a/4*3;return choose(s=>{const v=numbers(s);return p.includes('three equal')?close(v[0]/v[1],v[2])&&close(v[2]*100,v[3]):close(v[0],a/b)&&close(v[1],100*a/b);});
 case 'currency':return level===0?choose(s=>s==='€'):level===1?b*c:c/b;
 case 'units':return level===0?a*100:level===1?a*1000:a*1000-b;
 case 'volume':if(level===0)return p.startsWith('three')?3:a;if(level===1)return a*b*c;return a/(b*c);
 case 'scale':return level===0?b*c:c/b;
 case 'time':if(level===0){const hour=ns[1];return choose(s=>s===`${hour}:30`);}if(level===1)return choose(s=>s===`${a-12}:${String(b).padStart(2,'0')} pm`);return (c*60+d)-(a*60+b);
 case 'shapes':if(level===0){const sides=p.includes('three')?3:a;const names:Record<number,string>={3:'Triangle',4:'Quadrilateral',5:'Pentagon',6:'Hexagon',8:'Octagon'};return choose(s=>s===names[sides]);}if(level===1)return choose(s=>s==='It has four right angles');return;
 case 'solids':return level===0?2+2+2:level===1?4+4:undefined;
 case 'directions':if(level===0){const compass=['north','east','south','west'];const start=compass.findIndex(s=>new RegExp(`(?:face|from) ${s}`).test(p));if(start<0)return;const target=compass[(start+(p.includes('anticlockwise')?3:1))%4];return choose(s=>s.toLowerCase()===target);}if(level===1){const vertical=p.includes('north')?'north':'south',horizontal=p.includes('east')?'east':'west';return choose(s=>s.toLowerCase()===`${vertical}-${horizontal}`);}return;
 case 'angles':return level===0?choose(s=>s===(a<90?'Acute':a>180?'Reflex':a>90&&a<180?'Obtuse':'')):level===1?180-a-b:undefined;
 case 'chance':if(level===0)return choose(s=>s==='Impossible');if(level===1)return a===b?choose(s=>s==='Evens'):undefined;return choose(s=>s.toLowerCase()===['red','blue','green'].map((name,i)=>({name,count:ns[i]})).sort((x,y)=>x.count-y.count).map(v=>v.name).join(', '));
 case 'coordinates':return level===0?choose(s=>s===`${a} right, ${b} up`):undefined;
 case 'frequency':if(level===0)return p.includes('complete groups')?a*5+b:sum(ns);if(level===1)return p.includes('animals')?b+c:a+b;return ns[5]+ns[8];
 case 'averages':if(level===0)return Math.max(...ns)-Math.min(...ns);if(level===1)return sum(ns)/ns.length;return a*4-sum(ns.slice(1));
 default:return;
 }
}

// Accept equivalent decimal notation, but never parse a prefix or guess a unit.
export function numericResponse(value:string):number|undefined {
 const v=value.trim().replace(/−/g,'-');
 if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(v))return;
 const n=Number(v);
 const canonical=(s:string)=>{const negative=s.startsWith('-');const [whole,fraction='']=s.replace(/^[+-]/,'').split('.');const w=whole.replace(/^0+/, '')||'0',f=fraction.replace(/0+$/,'');const result=w+(f?'.'+f:'');return negative&&result!=='0'?'-'+result:result;};
 // Never silently round a learner's long decimal or oversized integer.
 return Number.isFinite(n)&&canonical(v)===canonical(String(n))?n:undefined;
}
export type MathsMark={status:'correct'|'incorrect'|'incomplete'|'grader-error';feedback:string};
export function markMaths(id:string,level:Level,t:Task,d:Draft):MathsMark {
 const known=checked.has(mathsQuestionSignature(id,level,t));
 const computed=known?deriveMathsAnswer(id,level,t):undefined;
 // All frozen numeric items have an exact result in whole units or hundredths.
 // Remove binary arithmetic noise only from our calculation, never the response.
 const rounded=typeof computed==='number'?Math.round(computed*100)/100:computed;
 const derived=typeof computed==='number'&&Math.abs(computed-Number(rounded))>1e-9?undefined:rounded;
 if(derived===undefined||!equal(derived,t.answer))return {status:'grader-error',feedback:'Our answer checks disagree, so this question cannot be marked safely. This is an app problem, not your mistake. Your work is saved; ask a grown-up to report this question. It will not count as an unsuccessful attempt.'};
 const response=typeof derived==='number'?numericResponse(d.answer):d.answer;
 if(response===undefined||d.answer.trim()==='')return {status:'incomplete',feedback:typeof derived==='number'?'Enter your answer as a number, for example 8 or 8.0. This does not count as an unsuccessful attempt.':'Choose an answer first.'};
 const keyMark=equal(response,t.answer),methodMark=equal(response,derived);
 if(keyMark!==methodMark)return {status:'grader-error',feedback:'Our answer checks disagree. Your answer has not been marked wrong. Ask a grown-up to report this question.'};
 // Rotating a rectangle preserves its area, perimeter and pond fraction.
 const gardenMatches=(d.width===t.width&&d.height===t.height)||(d.width===t.height&&d.height===t.width);
 if(id==='garden'&&!gardenMatches){
  const drawn=deriveMathsAnswer(id,level,{...t,width:d.width,height:d.height});
  return {status:'incomplete',feedback:equal(response,drawn)?`Your ${level===1?'perimeter':'area'} is correct for your ${d.width} m by ${d.height} m drawing. Now match the mission: ${t.width} m wide and ${t.height} m high, then check again. This does not count as an unsuccessful attempt.`:keyMark?`Your number answer is correct. Now set the garden to ${t.width} m wide and ${t.height} m high to finish the mission. This does not count as an unsuccessful attempt.`:`First match the garden to the mission: ${t.width} m wide and ${t.height} m high. Then use the hint to check your answer. This does not count as an unsuccessful attempt.`};
 }
 if(id==='shop'&&!t.items!.every((v,i)=>(d.counts[i]||0)===v.quantity))return {status:'incomplete',feedback:`${keyMark?'Your change answer is correct. ':''}Use the + and − buttons to pack the quantities in the mission, then check again. This does not count as an unsuccessful attempt.`};
 if(id==='fractions'&&(new Set(d.tiles).size!==derived||d.tiles.some(i=>i<0||i>=t.total!)||new Set(d.tiles).size!==d.tiles.length))return {status:'incomplete',feedback:`${keyMark?'Your number answer is correct. ':''}Tap the tiles to show the share in the mission, then check again. This does not count as an unsuccessful attempt.`};
 return keyMark?{status:'correct',feedback:'Your answer checks out.'}:{status:'incorrect',feedback:'Not quite yet. Use the hint to check your method, then try again.'};
}
