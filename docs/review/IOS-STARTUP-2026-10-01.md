# iOS build-8 white-screen investigation — 1 October 2026

Owner observed a blank white screen on both iPhone and iPad in TestFlight 0.2.0 (8). Treat this as a beta release blocker. Preserve existing installations and saved work; no reset, uninstall or record deletion is part of the repair.

## Concrete defect

The actual build-8 archive has no UIApplicationSceneManifest. Its staging AppDelegate uses the legacy UIWindow(frame: UIScreen.main.bounds) and factory.startReactNative path and does not conform to ExpoReactNativeFactoryProvider. The existing Expo scene config plugin was present in app.json but absent from these generated native files. The new version-number preflight passed without checking this integration. This is a packaging regression of the earlier scene-lifecycle correction, not a verified grading or saved-work defect.

The installed Expo 57 scene delegate creates the scene window, retrieves the retained factory from the provider protocol, and starts React Native. Its source documents SDK 27's scene requirement. Build 8 was compiled using SDK 27. The JavaScript bundle exists, so this is not simply an absent bundle. Until the corrected app is observed launching, the scene mismatch is a confirmed native defect and the leading explanation for the reported screen; do not claim the owner’s symptom independently reproduced or solved yet.

## Repair and prevention

Regenerated the staging iOS project through Expo prebuild to apply the existing scene plugin. It now declares one EXExpoAppSceneDelegate scene, retains the factory and implements ExpoReactNativeFactoryProvider, without duplicate legacy startup. iOS candidate is 0.2.0 (9); Android remains 0.2.0 (8). No curriculum, grader, question ID, storage key or saved-work schema changed.

Added scripts/verify-ios-startup.mjs to the integrity gate. It checks the generated native manifest and factory-provider integration and can check the actual packaged .app plist and standalone JavaScript bundle. Regression checks reject missing manifests, mismatched providers, unretained factories and duplicate startup; packaged positive and negative fixtures are covered. The new packaged check rejects the real build-8 archive. AGENTS.md now requires actual iOS startup configuration verification and observed standalone iPhone/iPad launch before beta upload.

55 tests and strict TypeScript pass. Build-9 standalone Release simulator compilation succeeded. Its actual packaged plist confirms 0.2.0 (9), the correct bundle identifier and the EXExpoAppSceneDelegate manifest; its embedded JavaScript bundle passes the packaged gate. The app was installed without uninstalling on the existing iPhone 18 Pro/iOS 27 and iPad Pro 13-inch/iOS 26.5 simulators. The device archive is building. Device Hub cannot yet be controlled through computer-use (timeout); owner has been asked to bring the test simulator forward. No simulator launch, physical-device pass, replacement upload or owner retest is claimed yet. Human educational/accessibility approvals and public launch remain on hold.
