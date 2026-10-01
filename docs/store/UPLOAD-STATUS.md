# Current testing upload status — 0.2.0 (4)

26 September 2026. This update supersedes the historical build 3 record below. Public release remains HOLD.

- Android build 4 is Available to internal testers. Existing 9-user tester list retained; no messages sent. Closed testing has not started.
- Apple build 4 upload complete, compliance cleared, assigned to Owner beta checks (1 tester), What to Test saved. Installation unverified. External build 3 awaiting review; parent group empty.
- Google children's-law certification and IARC terms explicitly authorised and saved. Age groups 6–8 and 9–12; Education category. Data safety (no collection/sharing, Play Families commitment) verified in Publishing overview as Complete Data safety questionnaire. Required setup still blocks sending changes for review. Other content declarations saved. Support website corrected to HTTPS and published.
- Apple Data Not Collected declaration published with owner approval. Age rating saved: 4+, Made for Kids ages 9–11. Three iPhone and three iPad screenshots uploaded and accepted; Android screenshots outstanding. Content rights unset pending rights review. Existing non-trader classification needs owner consideration before paid distribution. Price unselected.
- Build 4 adds privacy-policy link in unlocked Parents. 29 tests and strict type check passed; signed Android build and iOS archive/upload succeeded. See build4-manifest.json. Source commit 39d2ddd pushed to GitHub. Support/privacy site commit 183657f live.
- Screenshots use historical build 2 unchanged learning views, not build 4 validation. Enlarged diagram showed close-control/status-bar overlap (iphone-4.png): unresolved, fix and retest before release. Simulator coordinate control failed; owner asked to open iPad app. No physical-device validation or human review claimed.
- Human task approvals, supervised evaluation, final accessibility/device tests and release sign-off pending. Apple dSYM and Google mapping warnings recorded. Do not publish signing secrets or private review contacts.

Evidence: screenshots/google-internal-build4.png, screenshots/apple-testflight-build4.png, screenshots/google-declarations-saved.png.

---

# Historical testing upload status — 0.2.0 (3)

26 September 2026. Both signed builds uploaded. Public release remains **HOLD**. Owner authorised testing uploads, confirmed `com.transfertrainerni.learning.preview`, and chose Paid to preserve pricing options. No public price or public release has been authorised.

## Google Play

App record 4972778052494594728, BaseCodex developer account. Dedicated-key signed AAB accepted; version code 3 / version 0.2.0. Internal release “0.2.0 (3) - supervised beta” published and shown as **Available to internal testers**. The existing Transfer Trainer Testers list (9 users) is selected and saved for internal access. No invitations sent. Closed testing and its account-specific 12-testers/14-days requirement have not started. Policy/export declarations were explicitly authorised by the owner.

Name, short description and full description saved as a draft. The app icon and feature graphic are uploaded and saved in the draft. Phone screenshots and remaining setup fields are outstanding. The shared support contact and updated privacy URL are saved. Eventual paid-track pricing and wider community testing still need setup. Internal testers can access a paid app free; this does not imply free closed/open testing.

## Apple

App record 6816517899 created. Distribution-signed IPA uploaded successfully. TestFlight confirms upload **Complete**, build 3 **Ready to Submit**. Owner specifically authorised the Apple export-compliance answer after automatic review requested confirmation; it has now been submitted. Build 3 was submitted for external Beta App Review and now shows **Waiting for Review** in the Limited parent beta group. This group has no testers assigned; no invitations sent.

Promotional text, full description, keywords, subtitle “KS2 Maths & English Practice”, Education category, version 0.2.0, copyright and distribution review notes saved. Sign-in requirement disabled (the app has no account login). Public release set to manual. Owner supplied the review phone number; distribution and beta review contacts, feedback email, beta description, review notes and privacy URL have now saved. Screenshots and public-store setup remain outstanding. Public release is still on hold.

## Build evidence and limits

Build 3 removes two free-app claims and increments native build identifiers. Learning content and storage format unchanged. Strict type check passed; signed Android bundle, iOS archive/export and Apple upload succeeded. Build 2 test/device evidence remains historical, not relabelled build 3. No physical-device or human educational evaluation claimed.

Exact source/artifact hashes: [build3-manifest.json](build3-manifest.json). Artifacts are in `releases/store-build3/`. Apple upload had non-blocking missing-symbol warnings for React, ReactNativeDependencies and Hermes; these may limit crash symbolication and remain unresolved.

Android signing files are owner-only and ignored under `.local-signing/`. Keep a secure owner backup of the upload key and its password before production use; never include either in source archives, screenshots or tester downloads.

Human per-task review, supervised evaluation, final physical-device/accessibility checks and sign-off remain pending. Marketing scores are internal editorial assessments, not awards, measured outcomes or public 10/10 claims.

Evidence: [Google release](google-internal-build3.png), [Apple TestFlight build](apple-testflight-build3.png), [Google listing draft](google-listing-draft.png). Store copy: [STORE-COPY.md](STORE-COPY.md).

## Continuing setup — verified

Shared support site and privacy policy updated in commit 183657f and verified live at https://sineadhoben-alt.github.io/basecodex-support/privacy.html. Policy now explicitly names Little Learning Trails and describes local data, PIN limits, backups and beta feedback. Google privacy URL saved; public support email and website saved. Apple distribution review contacts and TestFlight contact information saved, with the owner's authorised phone number omitted from this public-status document.

Google internal access: Transfer Trainer Testers, 9 users, selected and saved. Opt-in link: https://play.google.com/apps/internaltest/4700948834125285662 . No invitation messages sent; the owner can share this link with members of the selected list. Closed testing has not started.

Apple: Owner beta checks internal group created with automatic distribution disabled and build 3 attached; owner added as the only internal tester. Limited parent beta external group created, build 3 submitted, status Waiting for Review. Automatic tester notification disabled. Owner explicitly requested no parents yet, only herself. External parent group remains empty.

Remaining: beta approval and iOS tester assignment; wider Android closed-test setup; screenshots and content/privacy/rating store declarations; ensure the published privacy link is also available inside the next native build; physical-device/accessibility evaluation and human sign-off. No public launch.

Evidence: apple-beta-waiting-review.png, android-testers-enabled.png, privacy-policy-live.png.

Owner tester verification: Apple shows 1 internal tester and 1 attached build, but the tester status is still “No Builds Available”. Do not claim an installation or successful invitation acceptance. External build remains Waiting for Review.

## iPad screenshots completed — 26 September 2026

Owner opened the simulator app. Captured genuine home, fractions diagram and reading activity screens at 2064 × 2752. Apple Media Manager verified 3 of 10 screenshots for iPad 13-inch. Files: screenshots/ipad-home.png, ipad-maths.png, ipad-english.png. Upload evidence: screenshots/apple-ipad-upload-proof.png. These show unchanged learning views in the historical simulator build, not build 4 physical-device validation. No public release submitted.

## Further setup — 26 September 2026

Apple Content Rights: owner explicitly confirmed necessary rights and authorised the Yes declaration; saved. Google dashboard now confirms 11/13 setup tasks complete (listing and price remain). Recommended UK price £4.99 one-time, awaiting owner selection; no price set. Android home screenshot captured through Android Studio and added to draft; second capture requested from owner because emulator touch automation returns noWindowsAvailable.

Diagram safe-area follow-up: source now wraps the native modal in a SafeAreaProvider. Strict type check and 29 automated tests passed. Release simulator build succeeded; updated iPad app installed without clearing data. Enlarged diagram visually checked below the status bar, and Close returned to the task. Evidence: screenshots/ipad-diagram-safe-area-fix.png. This source change is NOT in uploaded build 4. iPhone/Android verification and new numbered distribution builds remain required before calling the issue closed for release.

## Build 5 and pricing — 26 September 2026

Google pricing saved: UK £4.99 including VAT, with converted regional prices explicitly authorised by the owner. Google confirmed “Prices updated” and “Your changes have been saved”. Country availability was not expanded. This supersedes the earlier price-pending entry.

iOS build 5 uploaded successfully and processed. Owner-approved encryption answer reused without changes to encryption. Testing notes saved and Owner beta checks internal group attached, with 1 tester. Build 3 remains In Review for external testing; no external testers added.

Build 5 includes the diagram modal safe-area fix. Both iPhone and iPad release simulators show Close below system bars and return to the task. 29 automated tests and strict type check passed. Android signed AAB and APK built successfully; a duplicated generated PackageList class was quarantined outside the project before a successful retry. No family records were cleared. Android runtime, physical-device accessibility results and human educational sign-off remain pending.

Google listing still needs a second genuine Android screenshot. First screenshot and revised short description are saved in the draft. Public release remains on hold.

Google build 5 release verified: Active, latest release “0.2.0 (5) - supervised beta”, Available to internal testers, Not reviewed. Published 26 September 2026 23:48 local. Evidence: screenshots/google-internal-build5.png. Nonblocking missing-deobfuscation-file warning recorded. Public source version commit 6cc0eec pushed.

## Android screenshot retry — 27 September 2026

Captured the visible Android Maths overview through computer-use window capture and cropped only the Android display region, without changing app content (602 × 1072). Uploaded android-maths-overview.png; Google accepted it as 9:16 and shows 2/8 phone screenshots. Draft saved; listing has not been sent for review. Android Studio still rejects coordinate interaction; detailed activity captures remain pending. These captures are not build 5 runtime validation. AI-asset review controls require further inspection before completing listing submission.

Owner positioned the Android fractions activity on 27 September. Captured the genuine visible display, cropped only surrounding IDE chrome, and uploaded android-fractions.png (602 × 1072). Google phone screenshot count is now 3/8, saved as draft. English capture remains pending.

Owner positioned The lighthouse mystery reading passage on 27 September. Captured genuine Android display (602 × 1072), cropped surrounding IDE only, uploaded android-reading.png and saved listing draft. Phone screenshot count now 4/8. The three window-derived captures are below Google’s 1080-pixel minimum-per-side promotion recommendation; they are not full-resolution promotional assets or build 5 runtime validation. Public launch remains on hold.

## Google listing and owner beta submission — 27 September 2026

Owner confirmed icon and feature graphic were created during AI-assisted work and authorised labels. Those two assets labelled; genuine screenshots remain unlabelled. Listing saved as Ready to send for review; app setup checklist unlocked closed testing.

Owner requested only herself as tester, with no paid testing community yet. Created Little Learning Trails - Owner list with the owner's Google account (private email omitted here). Closed Alpha track set to UK only and that one-person list, feedback at the public support email. Build 5 reused from library and release 0.2.0 (5) - owner closed beta saved. Fourteen listing/content/closed-track changes submitted; Google shows Changes in review while quick checks are running. This is not Google approval or public production launch. Production remains inactive; no twelve-tester evaluation or fourteen-day test period has been completed.

Internal test list also changed from Transfer Trainer Testers to the owner-only list to match the latest preference; existing shared lists were not edited or deleted. No invitations or messages sent. Public launch remains HOLD for human review and evaluation.

## 27 September — maths grading fix / build 6

Owner clarified garden:2:1, a 2 m by 4 m rectangle with one quarter as a pond: 6 m² remaining. Fixed rejection of rotated rectangles and added independent calculations for all 640 closed maths questions. All 40 tests and strict type check pass. Exact rotated pond case verified in browser; physical iOS retest pending. Source commit 39b5a86 pushed. iOS archive and upload succeeded (nonblocking Hermes symbol-upload warning); processing, compliance and owner-group attachment not yet verified. Android build in progress and final orientation change requires a fresh bundle before upload. Existing records preserved. Public launch remains HOLD.

## 1 October — remaining checks / build 8

52 integrity tests and strict TypeScript passed. Fixed missing checked/selected accessibility states. Browser retested the exact rotated 6 m² pond item, incomplete construction, English punctuation choices, saved-answer recovery, fraction selection order and enlarged diagrams. No family records were cleared.

iOS build 7 exposed stale native version 0.1.0 and was not assigned to testers. Corrected native/app metadata to 0.2.0 (8); added native-version preflight and regressions. Build 8 archive metadata independently verified and upload succeeded. Missing framework dSYM warnings remain a crash-diagnostics limitation. Apple processed 0.2.0 (8); Missing Compliance remains. Saving the declaration was blocked by automatic approval review because prior approval named builds 6 and 7. Explicit build-8 approval is requested; owner-group attachment remains pending. Build 6 compliance and owner group (one tester) were confirmed earlier today.

Google internal build 8 is Active and Available to internal testers, owner-only list (one person), released 1 October 15:45. Closed/public tracks unchanged. Android standalone emulator update preserved and resumed the existing reading activity; additional native interaction/lifecycle tests were interrupted by the Mac locking. Store-signed files retain the established upload signature; a separate development-signed emulator copy avoided uninstalling the existing app.

Apple's public build-5 submission is Rejected under guideline 2.1 with Kids Category questions. A reply is drafted, not sent; owner message authorisation pending. Human reviews have not yet occurred, as confirmed by owner today. Physical-device/accessibility checks and final sign-off remain pending. Public launch remains HOLD. See ../review/REMAINING-CHECKS-2026-10-01.md.

### Build 8 owner approval completed

Owner explicitly approved build 8. Apple showed compliance already cleared (Ready to Submit) when reopened. Attached only Owner beta checks, verified one internal tester, and saved accurate What to Test notes; Apple displayed Saved. No external group/public submission added. Native device interaction, human reviews and public launch remain pending. The Kids Category reply is still an unsent draft.

## Build 8 startup blocker / build 9 repair in progress

Owner reports TestFlight 0.2.0 (8) opens to a blank white screen on both iPhone and iPad. The actual build-8 archive omitted the existing scene-lifecycle configuration. Build 8's successful upload and group attachment did not prove startup. Treat build 8 as affected. Build 9 restores the native scene/factory integration and adds actual generated/packaged startup checks; 55 tests pass. Standalone launch verification and the replacement upload are still pending. No saved records have been erased. See ../review/IOS-STARTUP-2026-10-01.md.

### Build 9 delivered to owner testing — 1 October

Corrected iOS build 0.2.0 (9) archive and upload succeeded. Actual archive startup configuration and version verified. Standalone Release iPhone 18 Pro/iOS 27 and iPad Pro 13-inch/iOS 26.5 UI tests passed for startup, terminate/reopen and background/reactivate; extended reopening checks preserve onboarding and saved challenge count. 55 integrity tests and strict TypeScript pass. Framework symbol warnings remain a crash-diagnostics limitation.

Apple processed build 9 and cleared compliance before the agent submitted any declaration in this follow-up. Owner beta checks attached with one internal tester; startup-focused What to Test saved and visibly confirmed. No external group or public release submitted. Owner should update the existing TestFlight installation to 0.2.0 (9), preserving its saved work, and confirm startup on the affected physical iPhone/iPad. Android remains build 8. Source/evidence: ../review/IOS-STARTUP-2026-10-01.md.
