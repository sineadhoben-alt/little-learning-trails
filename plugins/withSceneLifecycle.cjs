const {withInfoPlist,withAppDelegate}=require('expo/config-plugins');
function migrateAppDelegate(source){
 let next=source;
 if(!next.includes('ExpoReactNativeFactoryProvider'))next=next.replace('class AppDelegate: ExpoAppDelegate {','class AppDelegate: ExpoAppDelegate, ExpoReactNativeFactoryProvider {');
 const legacy=/#if os\(iOS\) \|\| os\(tvOS\)\s+window = UIWindow\(frame: UIScreen\.main\.bounds\)\s+factory\.startReactNative\([\s\S]*?launchOptions: launchOptions\)\s*#endif/;
 next=next.replace(legacy,'// ExpoAppSceneDelegate creates the scene window and starts the retained factory.');
 if(!next.includes('ExpoReactNativeFactoryProvider')||next.includes('window = UIWindow(frame: UIScreen.main.bounds)'))throw Error('Unexpected Expo AppDelegate template: review scene migration before building.');
 return next;
}
function withSceneLifecycle(config){
 config=withInfoPlist(config,config=>{
  config.modResults.UIApplicationSceneManifest={UIApplicationSupportsMultipleScenes:false,UISceneConfigurations:{UIWindowSceneSessionRoleApplication:[{UISceneConfigurationName:'Default Configuration',UISceneDelegateClassName:'EXExpoAppSceneDelegate'}]}};
  return config;
 });
 return withAppDelegate(config,config=>{
  if(config.modResults.language!=='swift')throw Error('Scene lifecycle requires the Swift Expo template.');
  config.modResults.contents=migrateAppDelegate(config.modResults.contents);return config;
 });
}
module.exports=withSceneLifecycle;
module.exports.migrateAppDelegate=migrateAppDelegate;
