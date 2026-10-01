# Standalone iOS startup regression

This external-app Xcode UI test targets the already installed **Release** app, bundle com.transfertrainerni.learning.preview. It asserts that startup reaches usable welcome/home content, then terminates/reopens and backgrounds/reactivates the app. It never uninstalls or clears storage. Simulator passes are not physical-device or full accessibility evidence.

Build the Release simulator app and run the packaged startup gate before installing it. Install it on a chosen test simulator with `xcrun simctl install <simulator-id> <release-app-path>`. Run:

```sh
xcodebuild -project tests/native-startup/StartupChecks.xcodeproj -scheme StartupChecks -destination 'platform=iOS Simulator,id=<simulator-id>' -resultBundlePath test-results/startup.xcresult -parallel-testing-enabled NO test
```

Use a fresh result-bundle path for each run. Run on iPhone and iPad. Keep the .xcresult and its screenshot attachments as candidate evidence. Computer-use screen controls failed on 1 October; the owner explicitly authorised Xcode UI testing as the alternative.
