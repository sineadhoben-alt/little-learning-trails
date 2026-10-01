import {existsSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

export function nativeVersionErrors(expo,ios,android){
 const errors=[];
 if(ios!==null){
  const value=key=>ios.match(new RegExp(`<key>\\s*${key}\\s*</key>\\s*<string>([^<]+)</string>`))?.[1];
  if(value('CFBundleShortVersionString')!==expo.version) errors.push('iOS marketing version differs from app.json');
  if(value('CFBundleVersion')!==expo.ios.buildNumber) errors.push('iOS build number differs from app.json');
 }
 if(android!==null){
  if(android.match(/\bversionName\s+["']([^"']+)["']/)?.[1]!==expo.version) errors.push('Android marketing version differs from app.json');
  if(Number(android.match(/\bversionCode\s+(\d+)/)?.[1])!==expo.android.versionCode) errors.push('Android build number differs from app.json');
 }
 return errors;
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const expo=JSON.parse(readFileSync('app.json','utf8')).expo;
 const read=path=>existsSync(path)?readFileSync(path,'utf8'):null;
 const ios=read('ios/LittleLearningTrails/Info.plist');
 const android=read('android/app/build.gradle');
 const errors=nativeVersionErrors(expo,ios,android);
 if(process.argv.includes('--require-native')&&(ios===null||android===null)) errors.push('Generate both native projects before packaging');
 if(errors.length){console.error(errors.join('\n'));process.exit(1);}
 console.log(ios===null||android===null?'Available native versions checked; absent native projects are not packaging evidence.':'Native marketing versions and build numbers match app.json.');
}
