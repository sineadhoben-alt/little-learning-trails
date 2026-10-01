import XCTest
final class StartupChecks: XCTestCase {
  func testStandaloneColdLaunchAndReopen() {
    continueAfterFailure = false
    let app = XCUIApplication(bundleIdentifier: "com.transfertrainerni.learning.preview")
    app.launch()
    XCTAssertTrue(app.staticTexts["Little Learning Trails"].waitForExistence(timeout: 30), "Standalone launch must render the app rather than a blank screen")
    let welcome = app.staticTexts["Make yourself at home"]
    let home = app.buttons["All Maths topics →"]
    XCTAssertTrue(welcome.waitForExistence(timeout: 15) || home.waitForExistence(timeout: 15), "Progress loading must reach a usable welcome or home screen")
    let startedOnHome = home.exists
    let trail = app.staticTexts.matching(NSPredicate(format: "label CONTAINS %@", "challenges explored. Every new idea is a step forward.")).firstMatch
    let savedTrailLabel = trail.exists ? trail.label : nil
    let shot = XCTAttachment(screenshot: app.screenshot())
    shot.name = "Standalone build 9 home"
    shot.lifetime = .keepAlways
    add(shot)
    app.terminate()
    app.launch()
    XCTAssertTrue(app.staticTexts["Little Learning Trails"].waitForExistence(timeout: 30))
    XCTAssertTrue(welcome.waitForExistence(timeout: 15) || home.waitForExistence(timeout: 15))
    XCTAssertEqual(home.exists, startedOnHome, "Reopening must preserve onboarding rather than silently starting again")
    if let savedTrailLabel {
      XCTAssertTrue(app.staticTexts[savedTrailLabel].exists, "Saved challenge count must survive reopening")
    }
    XCUIDevice.shared.press(.home)
    app.activate()
    XCTAssertTrue(app.staticTexts["Little Learning Trails"].waitForExistence(timeout: 15))
  }
}
