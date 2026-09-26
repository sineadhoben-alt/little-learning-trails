import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {migrateAppDelegate}=require('../plugins/withSceneLifecycle.cjs');
test('Scene migration hands startup to Expo scene delegate and is repeatable',()=>{
 const legacy=`class AppDelegate: ExpoAppDelegate {\n var window: UIWindow?\n var reactNativeFactory: RCTReactNativeFactory?\n func launch() {\n#if os(iOS) || os(tvOS)\n window = UIWindow(frame: UIScreen.main.bounds)\n factory.startReactNative(\n withModuleName: "main",\n in: window,\n launchOptions: launchOptions)\n#endif\n }\n}`;
 const next=migrateAppDelegate(legacy);assert.ok(next.includes('ExpoReactNativeFactoryProvider'));assert.ok(!next.includes('factory.startReactNative('));assert.ok(next.includes('var reactNativeFactory:'));assert.equal(migrateAppDelegate(next),next);assert.throws(()=>migrateAppDelegate('unknown template'));
});
