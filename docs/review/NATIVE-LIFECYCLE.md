# Standalone iOS lifecycle correction

26 September 2026. An Xcode 27 Release build compiled successfully but returned to the home screen on launch. The simulator log explicitly reported that scene lifecycle adoption was required. This was not visible when testing inside Expo Go.

The project now uses a reproducible Expo config plugin, `plugins/withSceneLifecycle.cjs`, to declare a single scene using Expo's bundled `EXExpoAppSceneDelegate`. The generated AppDelegate retains the React Native factory and conforms to ExpoReactNativeFactoryProvider; window creation and React Native startup happen through the scene delegate. Expo forwards background/active/link events to the app delegate subscribers. This uses the installed Expo 57 implementation rather than bypassing the SDK requirement.

The plugin fails if it encounters an unexpected template and has an idempotence/startup migration regression check. Final build and observed runtime evidence are recorded in CANDIDATE.md. A successful compilation alone is not a passing launch test.

Reference: [Apple's scene lifecycle migration guidance](https://developer.apple.com/documentation/uikit/transitioning-to-the-uikit-scene-based-life-cycle). Local implementation reviewed: expo/ios/AppDelegates/ExpoAppSceneDelegate.swift and ExpoReactNativeFactoryProvider.swift, installed Expo 57.0.25.
