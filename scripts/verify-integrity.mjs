import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
// Use this same Node runtime for every check, including native build invocations.
for(const args of [['scripts/verify-native-versions.mjs'],['node_modules/typescript/bin/tsc','--noEmit'],['--experimental-strip-types','--test',...readdirSync('tests').filter(f=>f.endsWith('.test.mjs')).sort().map(f=>`tests/${f}`)]]){
 const run=spawnSync(process.execPath,args,{stdio:'inherit'});
 if(run.error||run.status!==0){console.error('Learning integrity gate failed. Do not package or release.');process.exit(run.status||1);}
}
console.log('Learning integrity software gate passed. Human review and device checks remain separate release requirements.');
