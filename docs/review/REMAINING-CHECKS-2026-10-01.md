# Remaining-checks record — 1 October 2026

Candidate: Little Learning Trails — Maths & English 0.2.0, native build 8. Public release remains on hold. The owner confirmed today that teacher/parent checks have not yet been completed. No human approval, supervised study, physical-device pass or zero-error guarantee is implied by this record.

## Completed software and browser checks

- Integrity command passed on the saved project and isolated build copy: strict TypeScript plus all 52 tests. Existing coverage comprises 640 automatically marked maths items and 91 English items, with 84 open activities kept under adult review. These are software checks, not qualified educational approvals.
- Exported the standalone web app; tested a separate local profile on a new origin, without clearing family records.
- Garden `garden:2:0`: correct 18 with an unfinished drawing gives incomplete-construction guidance and explicitly does not count as an unsuccessful attempt. Completing the drawing succeeds.
- Exact reported pond item `garden:2:1`: 4 columns by 2 rows, response `6.000`, accepted with explanation “Area 8 m²; pond 2 m²; remaining 6 m².” Refreshed before marking: exact item, rotated drawing, typed answer and earlier completion all restored through Continue my adventure.
- English `grammar:2:0`: blank selection gives incomplete-input feedback; extra comma after “so” is rejected; the single option matching the explicitly requested comma placement is accepted. Completion and selected answer survive refresh.
- Fractions `fractions:0:0`: selected tiles 8, 5, 3, 1 in that order and entered 4; accepted as one half, with exactly those four checkboxes exposed as checked. Enlarged the equivalent-fraction diagram, zoomed to 150%, retained its text alternative and close control, then closed it; the solved answer was preserved and focus returned to Enlarge diagram.
- Parent controls open behind the adult gate. Cancelling returns to the child's work. No existing PIN was changed. Full physical-device gate/background testing is still pending.
- Phone-width web layout (390 × 844) keeps options and feedback readable without horizontal clipping in the inspected English task. This is browser layout evidence, not a native accessibility certification.
- Privacy-policy URL returned HTTP 200. Companion App Store URL initially rate-limited, then returned HTTP 200 with title “Transfer Trainer NI: SEAG Test App - App Store”. CCEA statutory Maths and English PDF links resolved. Android companion link remains disabled/coming soon as instructed by owner.

## New problem found and fixed

Answer radios used `selected` rather than `checked` accessibility state. In addition, the web renderer did not expose the existing state object as checked/selected ARIA attributes. The visible circle could change while the accessible checked value stayed absent.

Changed `src/App.tsx` so radios have explicit answer labels and checked state. Added explicit ARIA checked attributes to answer radios, fraction tiles and reflection checkboxes; explicit selected state to navigation tabs. Added the checked attribute to guided-project evidence checkboxes in `src/ProjectWorkspace.tsx`. Native state objects remain present. No question, grading rule, stable question ID or saved-work schema was changed.

Verified in the rendered web DOM after rebuilding: the correct English radio has `aria-checked="true"`; the other two have `false`; the Explore tab reports selected on the home screen. The existing saved English answer restores with the correct checked state. All 52 integrity tests still pass. Physical VoiceOver/TalkBack verification remains pending. Implementation follows https://reactnative.dev/docs/accessibility.

## Packaging and store work

A fresh isolated staging folder was required because older temporary folders were partly cleared. Excluded obsolete native caches instead of deleting user records. Regenerated the iOS native interface files omitted with the build cache. Reduced compiler concurrency after simultaneous clean builds overloaded the computer.

Apple build 6 was found at Missing Compliance. With the owner's explicit confirmation, submitted “None of the algorithms mentioned above”; status became Ready to Submit. Added only the existing Owner beta checks group (one internal tester), and saved accurate test notes distinguishing build 6's maths fixes from build 7's later English/accessibility work. Group membership and saved notes were visibly confirmed. No external testers or public release added.

Google internal testing now shows build 8 active and available to internal testers (1 October, 15:45). Only Little Learning Trails - Owner (one tester) is selected. Other tester lists remain unselected. Closed/public tracks were not changed. The pre-launch report has not been generated.

The iOS build-7 upload exposed a stale native marketing version: 0.1.0 rather than the configured 0.2.0. Build 7 was not assigned to testers. Corrected both native projects and app configuration to 0.2.0 (8). Added a native-version preflight, three regression tests and a mandatory actual-artifact metadata check before upload. The Android release APK was independently verified as 0.2.0 (8), package com.transfertrainerni.learning.preview, with the established upload certificate. The iOS build-8 archive succeeded and its embedded plist independently confirmed the same version/build/identifier; upload succeeded. Apple processed 0.2.0 (8) and now shows Missing Compliance. The unchanged encryption answer was selected but not saved: automatic approval review requires explicit build-8 authorisation because the owner approval named builds 6 and 7. A request is pending; owner-group attachment awaits compliance. Xcode reported missing dSYMs for React, ReactNativeDependencies and Hermes; this limits native crash symbolication but did not prevent upload.

Android standalone build 8 installed and launched on the Pixel 9 API 36 emulator and resumed its previous reading activity. The existing emulator installation had a development signature, so the store-signed APK could not update it directly. A separate emulator-only copy was signed with the existing development key; no uninstall, record clearing or change to the store artifact occurred. Native answer marking and additional lifecycle checks remain incomplete because the Mac locked during UI verification.

Apple's public build-5 submission is Rejected, with Kids Category information requested under guideline 2.1. A factual reply is prepared in docs/store/APPLE-KIDS-REVIEW-REPLY-2026-10-01.txt; it has not been sent and awaits owner authorisation. Public release remains held. Browser checks used the build-7 web export; build 8 has the same learning/UI code with corrected native version metadata.

## Release hold and evidence limits

Still required: actual installed-build lifecycle, offline, keyboard, diagram, large-text and VoiceOver/TalkBack checks on intended iOS/Android devices; qualified Maths and English per-item approvals and rubric review; supervised P5–P7/parent evaluation; final owner release permission and exact candidate sign-off. Anonymous reviewer codes are acceptable, with relevant expertise verified privately by the owner. The earlier build-2 candidate register is historical and must not be represented as build-8 approval.

Evidence: `evidence-2026-10-01/` contains browser screenshots, the integrity log and source SHA-256 values. These document the specific checks above; they are not proof of unperformed checks.

## Owner approval follow-up — 1 October

The owner explicitly approved build 8. On reopening App Store Connect, the declaration had already cleared: build 0.2.0 (8) showed Ready to Submit with no Missing Compliance control. Added the existing internal Owner beta checks group and verified exactly one tester. Saved build-specific What to Test notes, including the 6 m² pond, rotated drawings, English marking, saved-work recovery, fraction order and VoiceOver. Apple confirmed Saved. No external group was added and no public release was submitted. Local evidence: evidence-2026-10-01/apple8-owner.jpg. This completes processing/compliance/group verification; Ready to Submit is Apple's displayed status, not an external beta approval.

The Android emulator is visible again. Automated taps still fail because computer-use cannot locate the window at the requested screen position, even after reconnecting and raising the window. No successful native answer-marking/lifecycle result is claimed; these and physical-device checks remain pending. The Kids Category reply remains an unsent draft awaiting explicit message authorisation.
