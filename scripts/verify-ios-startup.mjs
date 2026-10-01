import {existsSync,readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
const require=createRequire(import.meta.url);
const plist=require('@expo/plist').default;

export function iosStartupErrors(info,delegate){
 const errors=[];
 const scene=info?.UIApplicationSceneManifest;
 const configs=scene?.UISceneConfigurations?.UIWindowSceneSessionRoleApplication;
 if(scene?.UIApplicationSupportsMultipleScenes!==false||!Array.isArray(configs)||configs.length!==1||configs[0]?.UISceneDelegateClassName!=='EXExpoAppSceneDelegate')errors.push('iOS scene manifest must start the single Expo application scene');
 if(delegate!==undefined){
  if(!/class AppDelegate:\s*ExpoAppDelegate,\s*ExpoReactNativeFactoryProvider\s*\{/.test(delegate))errors.push('AppDelegate must provide the factory to the Expo scene delegate');
  if(!/reactNativeFactory\s*=\s*factory/.test(delegate))errors.push('AppDelegate must retain the React Native factory');
  if(/factory\.startReactNative\s*\(/.test(delegate)||/UIWindow\(frame:\s*UIScreen\.main\.bounds\)/.test(delegate))errors.push('Legacy AppDelegate window startup must not compete with scene startup');
 }
 return errors;
}

export function verifyPackagedStartup(appPath){
 const infoPath=join(appPath,'Info.plist');
 const decoded=spawnSync('/usr/bin/plutil',['-convert','xml1','-o','-',infoPath],{encoding:'utf8'});
 if(decoded.status!==0)return ['Cannot read packaged iOS Info.plist'];
 const errors=iosStartupErrors(plist.parse(decoded.stdout));
 const bundle=join(appPath,'main.jsbundle');
 if(!existsSync(bundle)||readFileSync(bundle).length<1000)errors.push('Packaged standalone JavaScript bundle is missing or empty');
 return errors;
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const appIndex=process.argv.indexOf('--app');
 let errors=[];
 if(appIndex>=0){
  if(!process.argv[appIndex+1])throw Error('--app requires a packaged .app path');
  errors=verifyPackagedStartup(process.argv[appIndex+1]);
 }else{
  const info='ios/LittleLearningTrails/Info.plist',delegate='ios/LittleLearningTrails/AppDelegate.swift';
  if(!existsSync(info)||!existsSync(delegate)){
   if(process.argv.includes('--require-native'))errors.push('Generate iOS before checking native startup');
   else console.log('iOS project absent; source checks are not packaged startup evidence.');
  }else errors=iosStartupErrors(plist.parse(readFileSync(info,'utf8')),readFileSync(delegate,'utf8'));
 }
 if(errors.length){console.error(errors.join('\n'));process.exit(1);}
 console.log('iOS startup configuration gate passed; observed device launch is still required.');
}
