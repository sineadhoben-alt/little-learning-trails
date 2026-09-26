import {parseState,type State} from './model.ts';
export const PROGRESS_KEY='@learning-trails/v1';
type Storage={getItem:(key:string)=>Promise<string|null>;setItem:(key:string,value:string)=>Promise<unknown>};

// Snapshot before queuing; preserve write order and allow retry after rejection.
// Loading never writes, including when data cannot be safely recovered.
export function createProgressPersistence(storage:Storage,status:(message:string)=>void){
 let queue:Promise<void>=Promise.resolve();let revision=0;
 return {
  async load(){const raw=await storage.getItem(PROGRESS_KEY);return raw===null?null:parseState(raw);},
  save(value:State):Promise<boolean>{
   const rev=++revision;status('Saving…');
   let payload:string;
   try{payload=JSON.stringify(parseState(JSON.stringify(value)));}
   catch{status('Could not save. Please retry.');return Promise.resolve(false);}
   const write=queue.then(()=>storage.setItem(PROGRESS_KEY,payload)).then(()=>{
    if(revision===rev)status('Saved on this device');return true;
   },()=>{if(revision===rev)status('Could not save. Please retry.');return false;});
   queue=write.then(()=>{});return write;
  }
 };
}
