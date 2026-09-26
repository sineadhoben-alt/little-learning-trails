# Technical and family-use review

26 September 2026 · Codex AI-assisted reviewer · version 0.1.0. Source hashes are recorded in `reviewed-source-sha256.txt`. No production code was changed during this review. No human professional sign-off is implied.

## TECH-01 — P1 release blocker: ordinary shopping can lock out saved progress

**Reproduced in the browser and independently with the persistence model.**

Steps: on a fresh shop level, select **+ Juice before + Apple**. Wait for “Saved on this device”, then reload. Actual: “Let’s protect your saved work / Your saved progress could not be loaded.” The app offers erasure, but no repair. Other saved work is inaccessible because the whole state is rejected. The stored data is not automatically deleted; do not confuse lockout with confirmed physical deletion.

Cause: `src/App.tsx:51` copies an empty counts array and assigns index 1, creating a hole at index 0. JSON serialises the hole to null. `src/model.ts:31` requires every saved count to be an integer. The condition is reachable through normal controls at all shop levels, not malicious data. A later first-item edit can fill the hole, which explains why the normal-order tests passed.

![Reproduced progress lockout](progress-failure.png)

Fix: maintain dense item-count arrays with explicit zeroes and migrate existing shop drafts containing null placeholders to zero only where the known old representation permits it. Preserve valid stories, nicknames, results and other drafts. Add a safe recovery path, not a default whole-state wipe.

Acceptance: start each shop level by adding every possible item first; background/reopen/reload between edits; verify all quantities and unrelated work survive. Test recovery from an already-saved null-count state. Add the regression to the normal test suite. `reproduce-save-bug.mjs` is a review reproduction, not a fix.

## TECH-02 — P1 for the fully-adaptive release promise: insufficient evidence for progression

`src/model.ts:8–16` reads only the most recent completed result for the topic. It does not use the history of failed drafts or accumulated evidence. One first-try correct response raises the level; repeating a revealed answer can do the same. Three finite tasks per topic are reused. Broad trail levels can change the skill being tested, so a higher level is not always harder.

A model probe with a first-try level-1 tables result and twelve failed level-2 attempts still returns level 2 as the suggestion. `App.tsx:66` does offer an easier-step button after two failed attempts, which mitigates this but is learner-selected; do not report that all repeated errors automatically lower the suggestion. The three-attempt rule is applied when a task is eventually completed.

Fix: define subskills/prerequisites, varied equivalent item banks, multiple observations and misconception-responsive scaffolds. Update explanations to match the actual rules. Keep manual level choice. Human KS2 reviewers should validate task difficulty and adult rubrics. Acceptance: scripted struggling/secure/uneven-profile journeys use unseen tasks and yield justified suggestions; recent failures produce timely support; replaying the same known answer cannot establish fresh mastery. Narrow public claims until validated.

## TECH-03 — P1 native release gate: deliverable evidence incomplete

Android log now records **BUILD SUCCESSFUL in 10m 37s**; an arm64 preview APK exists at `android/app/build/outputs/apk/release/app-release.apk`. Generated `build.gradle:115` signs release with the development debug key. This proves compilation, not production signing, installed-APK usability, offline behaviour or store acceptance.

iOS standalone simulator build **failed** in ExpoModulesJSI's nested framework signing phase: “resource fork, Finder information, or similar detritus not allowed” (`ios-native-build.log:7120–7124`). Expo Go can display the app; this does not demonstrate a standalone release build. Previous TESTING.md's “in progress” text is superseded by these observed results.

Fix: clean the affected generated build artefact metadata and correct/re-run the build workflow; do not remove user files or weaken device security. Establish stable identifiers and owner-controlled release signing. Acceptance: fresh standalone iOS and Android builds install on representative devices and pass resume/offline/background/upgrade tests; release artefacts are tied to reviewed source. Store submission remains a separate owner-authorised step.

## TECH-04 — High: adult controls are ordinary child controls

`App.tsx:65,69` exposes adult ratings, destination editing, owner-verification toggles and progress reset without an adult handover or gate. The confirmation wording for reset is clear, and local-only business edits are disclosed, but a child can self-award “secure” or change a destination then mark it verified.

Fix: remove business-authoring controls from distributed family builds; provide an accessible adult gate for sensitive parent actions; make the limits of adult feedback explicit. A gate does not prove identity. Acceptance: a normal child journey cannot alter URLs or self-label a judgement as independently adult-reviewed; an adult can cancel without losing work. This is a product finding, not a legal/store-compliance determination.

## TECH-05 — Medium: state validation needs migration and targeted recovery

`model.ts:25–35` correctly rejects many invalid payloads, but validates all drafts as one unit and has no migration/recovery apart from erasure. It accepts arbitrary adultRating strings and only checks the history container/length rather than entries. Array bounds are generic rather than tied to actual item/task limits. These are hardening concerns; TECH-01 is the reproduced ordinary-use failure.

Acceptance: malformed data tests cover every persisted field, incompatible content versions, interrupted writes and storage failure. Preserve/export recoverable work. Do not claim data-loss immunity; backups/device transfer remain absent.

## Test matrix and evidence limits

| Environment/check | Evidence this review | Outcome |
|---|---|---|
| Source/version | 0.1.0; source checksums retained | Recorded |
| TypeScript | Fresh strict check | Pass |
| Existing automated suite | Fresh run: 15/15 pass | Pass, insufficient regression coverage |
| Shop non-first-item persistence | Isolated browser origin 127.0.0.1:8086; +Juice then reload; model JSON round-trip | **Fail, TECH-01** |
| Failed-attempt adaptation | Direct probe against suggestedLevel | Does not lower suggestion from incomplete failed draft |
| iPhone 18 Pro / iOS 27 simulator / Expo Go | Onboarding, nickname entry, shop controls, quantities, empty-answer retry feedback; AX labels visible | Limited smoke pass; not standalone or full screen-reader audit |
| Android arm64 standalone build | Gradle log/APK metadata | Build pass, development signing |
| iOS standalone simulator build | Xcode log | **Fail, TECH-03** |
| Browser 320×740 | Garden width8:243px at x45/right288; document width320 | No page overflow; panel-padding intrusion |
| Earlier development journeys | TESTING.md records 8 core formats, reload/resume, adult feedback, reset/cancel, business settings | Historical evidence; not independently repeated in full here |
| Physical iPhone/iPad/Android phone/tablet | No device matrix run | Untested |
| Standalone offline and force-quit/upgrade recovery | No completed device matrix | Untested |
| Save rejection/full storage/interrupted write | Code inspection only | Untested end-to-end |
| Sibling isolation | Separate local-storage model; no account/sync; prior model test | Architecture consistent; multi-device runtime trial pending |
| VoiceOver/TalkBack, 200% native text | AX labels observed only | Full journeys untested |
| Supervised children / SEND access / parent usability | No participants recruited | Untested |

## Privacy and promotion

Source inspection finds local AsyncStorage, no child account, no recording or intentional analytics upload in application code. This is not a network-capture or dependency audit. Android's generated manifest includes storage, overlay and vibration permissions beyond visible core learning needs; audit the final merged release manifest and remove unnecessary capabilities before distribution. Backup is enabled; the app correctly says operating-system backups may include its data. Child writing is not encrypted by application-specific code.

The existing Transfer Trainer NI Apple ID is hardcoded as 6797931376 and its local icon is used. Android is disabled and labelled coming soon by default, matching the owner's instruction. Current web-tool re-verification of Apple could not fetch the page; the earlier build record says it was verified. Check a real-device tap to the correct region listing before release. No nonexistent Play URL was invented. HTTPS validation rejects credentials for the website field; Play validation should apply the same credential rejection. No new external message, publication or child-data transfer was performed.
