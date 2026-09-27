import type {Task,Level} from './content';
import type {Draft} from './model';
import type {MathsMark} from './mathsCheck';
import signatures from './englishQuestionSignatures.ts';
export const englishQuestionSignature=(id:string,level:Level,t:Task)=>JSON.stringify([id,level,t.prompt,t.hint,t.explanation,t.passage,t.options?[...t.options].sort():undefined,t.words]);
const checked=new Set(signatures);
type Evidence={quote:string;accept:RegExp;reason:string};
const e=(quote:string,accept:RegExp,reason:string):Evidence=>({quote,accept,reason});
/** Independently authored evidence/concepts, not copied answer keys.
 * Frozen question inputs prevent these narrow rules being used on new prose.
 * Inference questions identify the strongest supplied evidence, not certainty.
 */
const evidence:Record<string,Evidence[]>={
 'detective:0':[
  e('key tied to blue string',/blue string/i,'The passage explicitly links the string to the key; the ribbon and map are not stated.'),
  e('Beside the backpack was a yellow glove',/yellow glove/i,'The glove is beside the backpack; the whistle is inside and the cup is on the bench.'),
  e('left it on the windowsill',/windowsill/i,'The note is left on the windowsill; the plate and shoes belong to other actions.'),
  e('The hare reached the pond first',/hare/i,'First identifies the hare; the badger and fox arrive later.'),
  e('Her orange kite',/^orange$/i,'Orange modifies kite; purple and white describe clothing.')],
 'detective:1':[
  e('Then she heard a chair scrape',/chair scrapes inside/i,'Current movement is stronger evidence of presence than the key location or dry floor; it remains an inference.'),
  e('heard a hammer tapping',/hammer tapping/i,'A current sound of work is relevant; dust and rust are old static details.'),
  e('Her hands trembled as she checked her lines',/hands tremble.*checks her lines/i,'Behaviour linked to performing supports nervousness; shoes and wall do not.'),
  e('a worker set chairs beside clean tables',/chairs being set/i,'Setting out chairs is preparation; the photograph and pavement crack are unrelated.'),
  e('He walked on tiptoe and eased the bedroom door shut without a sound',/tiptoe.*door gently/i,'Quiet actions support the inference; bag colour and hallway length do not.')],
 'detective:2':[
  e('noticed the small, dark desk lamp',/notices the dark desk lamp/i,'The second lamp resolves the misunderstanding; the other options contradict or invent events.'),
  e('saw the pet lizard scratching the wall of its tank',/lizard scratches/i,'The lizard provides a source for the sound; shelf presence and curtain colour do not.'),
  e('an open umbrella dripping',/umbrella dripping/i,'Dripping provides an alternative water source; carpet colour and a closed window do not explain it.'),
  e('a muddy slope beside the stream',/muddy slope.*stream/i,'The slope supports the river-bank meaning; money and clock are not the new evidence.'),
  e('Remove this wheel to see how the gears turn',/wheel is designed to come off/i,'The instruction shows intentional removal; colour and box size do not establish damage or design.')],
 'reading-library:0':[
  e('A tapping sound came from the wall. He stopped to listen',/hears a tapping sound/i,'The immediate event explains stopping; lost boots and sleeping are absent.'),
  e('A fallen branch blocked the path',/branch blocks/i,'The obstacle explains stopping; drink and lost map are not stated.'),
  e('Curious about the noise, he lifted the lid',/find out what is rattling/i,'Curiosity about the noise is explicit; hiding a shoe and napping are absent.'),
  e('a friend called, “Ella!”',/friend calls her name/i,'The call prompts the turn; the notebook is still with her and sunset is not stated.'),
  e('so the sunlight could reach its leaves',/give the plant light/i,'The purpose is explicit; emptying the pot and painting the wall are absent.')],
 'reading-library:2':[
  e('Air and suitable moisture help them work',/air helps.*break scraps down/i,'The statement preserves helps; neither every scrap nor instant compost is supported.'),
  e('Some seeds have light structures that help the wind carry them',/some seeds.*wind/i,'Some and wind are supported; all seeds and only water overgeneralise or contradict.'),
  e('a bird feeder received six visits',/six visits were recorded/i,'Visits are counted; individual bird identity and daily recurrence are unknown.'),
  e('When they moved the lamp, the toy’s shadow changed position',/in this investigation.*moving the lamp changed the shadow’s position/i,'This particular observed change is supported; always still and equal sizes are not.'),
  e('may be renewed if no other reader is waiting',/renewed if no one is waiting/i,'The renewal condition is preserved; opening hours and year-long loans are unsupported.')],
 'source-detective:0':[e('when a museum opens',/museum’s current opening-times page/i,'The current official opening-times page directly addresses the question; fiction and a drawing do not provide current hours.')],
 'source-detective:1':[e('We counted 12 plant species on Monday',/record-sheet statement/i,'The count and date describe an observation; best is a judgement and both are not measured facts.')],
 'media:0':[e('neutral report',/^The school planted ten trees\.$/,'A count reports an event; amazing/change everything exaggerates and must love pressures the reader.')],
 'media:1':[e('Tiny team, gigantic change!',/event sound striking/i,'The size contrast emphasises impact; it supplies neither an exact size nor proof all changes are good.')],
 'reading-purpose:0':[e('one bus time from a timetable',/^Scan for the route and time$/,'Scanning locates a specified time; reading everything twice is unnecessary and guessing colour supplies no time.')],
 'reading-purpose:1':[e('general topic of an article',/^Skim its title and main sections$/,'Titles and sections support an overview; comma counts and a last letter do not reveal the topic.')],
 'spoken-written:0':[
  e('Which message is clearer in written instructions?',/^Place the book on the shelf beside the door\.$/,'Named object and location supply the missing context; it/there/that thing rely on unstated referents.'),
  e('Which written instruction is clearest without pointing?',/^Place the pencils in the blue pot\.$/,'Pencils and blue pot identify object and destination; those/there/stuff do not.'),
  e('Which written instruction is clearest to someone who cannot see your gesture?',/^Attach the label to the front of the box\.$/,'Label, box and front supply explicit referents; it/there/that do not.'),
  e('Which written instruction supplies the missing context?',/^Put the clean plates on the kitchen table\.$/,'Plates and kitchen table name object and destination; them/things/where I said do not.'),
  e('Which instruction can a reader follow without seeing you point?',/^Give the green folder to the librarian\.$/,'Folder and librarian identify the item and recipient; this/him/that thing do not.')]
};
export function englishCandidates(id:string,level:Level,t:Task):{answers:string[];reason:string} {
 const options=t.options||[],text=`${t.prompt}\n${t.passage||''}`;
 const select=(predicate:(s:string)=>boolean,reason:string)=>({answers:options.filter(predicate),reason});
 if(id==='words'&&t.words){
  const words=t.words;
  if(level===0){const end=words.filter(w=>w.endsWith('.')),middle=words.filter(w=>w!=='The'&&!w.endsWith('.'));return {answers:words.length===3&&words.includes('The')&&end.length===1&&middle.length===1?[`The ${middle[0]} ${end[0]}`]:[],reason:'Use every tile once: determiner The, singular subject, past-tense verb with final full stop. Other permutations violate the stated opening or sentence structure.'};}
  const noun=words.filter(w=>w.endsWith('?'));return {answers:words.length===4&&['Where','is','the'].every(w=>words.includes(w))&&noun.length===1?[`Where is the ${noun[0]}`]:[],reason:'Use every tile once: Where + is + the + noun and question mark. Other permutations do not form the requested standard written location question.'};
 }
 if(id==='words'&&level===2){const bases=['passenger','traveller','guide','artist','cook'];const base=bases.find(b=>new RegExp(`\\b${b}\\b`,'i').test(t.hint));return select(s=>s===`${base}s`,'The named base keeps its spelling and takes plural -s; alternatives omit, substitute or repeat letters. Traveller uses the explicitly stated UK convention.');}
 if(id==='spelling'){const base=t.prompt.match(/(?:to|of) (\w+)[.?]/)?.[1];return select(s=>s===(level===0?`${base}ing`:base?.replace(/y$/,'ied')),'Apply the stated suffix rule: unchanged base + ing for these words; consonant + y changes to i before ed. Other options violate that spelling.');}
 if(id==='grammar'&&level===0)return select(s=>/^[A-Z][^.]*\.$/.test(s),'Both a capital at the beginning and a final full stop are required. Each alternative lacks one of these criteria.');
 if(id==='grammar'&&level===1){const owner=t.prompt.match(/There is one (\w+)\./)?.[1];return select(s=>s.startsWith(`the ${owner}’s `),'One named owner takes apostrophe + s. Plural owners and a missing possessive apostrophe do not express the stated ownership.');}
 if(id==='grammar'&&level===2)return select(s=>/^[^,]+, so [^,]+\.$/.test(s),'The question explicitly requires so linking the two clauses, exactly one comma before it, and none after it. A run-on or an extra comma does not follow that requested pattern.');
 if(id==='word-strategies'&&level===0){const meanings:Record<string,string>={muddy:'Covered in wet earth',sandy:'Covered with sand',snowy:'Covered with snow',stony:'Covered with stones',smoky:'Containing smoke'};const word=Object.keys(meanings).find(w=>new RegExp(`\\b${w}\\b`).test(t.prompt));return select(s=>s===meanings[word||''],'The base word and supplied sentence jointly establish the contextual meaning; alternatives introduce unrelated materials or qualities.');}
 if(id==='word-strategies'&&level===1){const word=t.prompt.match(/\b(unsafe|unfair|unkind|unclear|unusual)\b/)?.[1];const base=word?.slice(2);return select(s=>s.toLowerCase().includes(`not ${base}`),'In these specific words un- negates the base adjective; it does not intensify it or mark yesterday. This is not asserted for every word beginning un.');}
 if(id==='reading-library'&&level===1)return select(s=>/\b(?:wind tiptoes|window winked|moon listened|rain argued|stairs complained)\b/.test(s),'The selected phrase gives a non-human subject a human-like action. Other offered phrases merely name a colour, place or object.');
 const rules=(evidence[`${id}:${level}`]||[]).filter(r=>text.includes(r.quote));
 if(rules.length!==1)return {answers:[],reason:'No unique independently reviewed evidence rule matches.'};
 return select(s=>rules[0].accept.test(s),rules[0].reason);
}
export function markEnglish(id:string,level:Level,t:Task,d:Draft):MathsMark {
 const known=checked.has(englishQuestionSignature(id,level,t));
 const review=known?englishCandidates(id,level,t):{answers:[],reason:''};
 if(review.answers.length!==1||review.answers[0]!==t.answer)return {status:'grader-error',feedback:'This question does not pass our answer checks. This is an app problem, not your mistake. Your work is saved; ask a grown-up to report this question. It will not count as an unsuccessful attempt.'};
 if(t.words){if(d.words.length!==t.words.length)return {status:'incomplete',feedback:'Use every word tile once before checking. This does not count as an unsuccessful attempt.'};if(new Set(d.words).size!==d.words.length||d.words.some(i=>!Number.isInteger(i)||i<0||i>=t.words!.length))return {status:'incomplete',feedback:'Please rebuild the sentence using each word tile once.'};}
 else if(!d.answer)return {status:'incomplete',feedback:'Choose an answer first. This does not count as an unsuccessful attempt.'};
 const response=t.words?d.words.map(i=>t.words![i]).join(' '):d.answer;
 const keyMark=response===t.answer,evidenceMark=response===review.answers[0];
 if(keyMark!==evidenceMark)return {status:'grader-error',feedback:'Our answer checks disagree. Your answer has not been marked wrong.'};
 return keyMark?{status:'correct',feedback:'Your answer checks out.'}:{status:'incorrect',feedback:'Not quite yet. Use the hint and the words in the question to check, then try again.'};
}
