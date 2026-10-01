import test from 'node:test';
import assert from 'node:assert/strict';
import {iosStartupErrors,verifyPackagedStartup} from '../scripts/verify-ios-startup.mjs';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createRequire} from 'node:module';
const plist=createRequire(import.meta.url)('@expo/plist').default;
const info={UIApplicationSceneManifest:{UIApplicationSupportsMultipleScenes:false,UISceneConfigurations:{UIWindowSceneSessionRoleApplication:[{UISceneConfigurationName:'Default Configuration',UISceneDelegateClassName:'EXExpoAppSceneDelegate'}]}}};
const delegate='class AppDelegate: ExpoAppDelegate, ExpoReactNativeFactoryProvider { var reactNativeFactory: RCTReactNativeFactory?; func launch() { reactNativeFactory = factory } }';
test('Actual native configuration rejects the build-8 legacy lifecycle',()=>{
 assert.ok(iosStartupErrors({},'class AppDelegate: ExpoAppDelegate { factory.startReactNative() }').length>=2);
 assert.deepEqual(iosStartupErrors(info,delegate),[]);
});
test('Scene declaration and retained factory must agree; duplicate startup fails',()=>{
 assert.ok(iosStartupErrors(info,delegate.replace(', ExpoReactNativeFactoryProvider','')).length);
 assert.ok(iosStartupErrors(info,delegate.replace('reactNativeFactory = factory','')).length);
 assert.ok(iosStartupErrors(info,delegate+' factory.startReactNative()').length);
 assert.ok(iosStartupErrors({UIApplicationSceneManifest:{...info.UIApplicationSceneManifest,UIApplicationSupportsMultipleScenes:true}},delegate).length);
});
test('Packaged app verification rejects missing scene configuration and missing bundle',{skip:process.platform!=='darwin'},()=>{
 const dir=mkdtempSync(join(tmpdir(),'llt-startup-regression-'));
 try{
  writeFileSync(join(dir,'Info.plist'),'<?xml version="1.0" encoding="UTF-8"?><plist version="1.0"><dict/></plist>');
  assert.equal(verifyPackagedStartup(dir).length,2);
  writeFileSync(join(dir,'main.jsbundle'),'x'.repeat(2000));
  assert.equal(verifyPackagedStartup(dir).length,1);
  writeFileSync(join(dir,'Info.plist'),plist.build(info));
  assert.deepEqual(verifyPackagedStartup(dir),[]);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
