# Additional integrity audit — source build 7

Permanent owner rule: AGENTS.md and docs/GRADING-INTEGRITY.md. Reusable cross-app prompt: docs/REUSABLE-APP-REVIEW-PROMPT.md.

## Scope and evidence

640 closed maths items and 91 closed English items have independent domain/evidence rules. Frozen question inputs fail closed after unreviewed content changes. All 731 accept their supported answer. Every English option is checked under all offered-option permutations; all word-tile permutations have exactly one correct result. All maths options are checked in original and reversed order. Corrupted keys and guidance cannot create a child error. 84 open activities remain explicitly checklist/adult-reviewed; structural checks ensure none is automatically marked against a unique key. This is an AI-assisted software/content check, not qualified human educational sign-off or a completed physical-device study. Guided projects and their full human rubric review remain subject to the existing release hold.

| Problem found | Repair | Evidence |
|---|---|---|
| Garden pond: 2 × 4 and rotated 4 × 2 treated differently | Accept both orientations; 8 − 2 = 6 | Exact garden:2:1 regression, both orientations; browser proof |
| Correct numbers rejected because models are unfinished | Separate incomplete feedback from wrong maths | Garden, basket, tiles and duplicate-index tests |
| Numeric formatting limited to two decimal places | Accept equivalent decimal spellings | 6.000 accepted |
| Approximate numeric comparison could accept unequal values | Exact response comparison; reject silently rounded long inputs | Near-but-unequal decimal/key regression |
| English grading trusted only the stored key | Independent evidence/rule checks and frozen input guard | All 91 items; corrupted keys/passages; distractor permutations |
| “Compost needs air” stronger than “air helps” in source | Answer now states that air helps the decomposers | reading-library:2:0 |
| Shadow observation expressed as a general claim | Restrict claim to this investigation | reading-library:2:3 |
| “Clearly joins” left punctuation criterion implicit | Specify so and the requested comma placement | grammar:2:0–4 |
| Traveller spelling convention only in hint | State UK spelling in question | words:2:1 |
| Option order could trigger a frozen-input mismatch | Compare sorted option inputs; independent answer remains content-based | Maths reversal and all English option permutations |
| Blank English selection could count as wrong | Separate incomplete-input state | English blank/word-tile checks |

Strict type check and 49 automated tests pass via `node scripts/verify-integrity.mjs`. Export has a preflight integrity gate. Every-edit/native preflight is also mandatory in project instructions. Existing user records were not erased or silently reclassified.

## Distribution boundary

Build 6 uploaded to Apple contains the garden/independent-maths fix, not these subsequent English and exact-response changes. Source is now numbered build 7 to prevent misidentification. Build 7 has not been packaged/uploaded or physically tested. The Android build-6 attempt failed on duplicate generated resources; its cleanup/retry job was stopped before broader audit changes could be packaged inadvertently. Duplicate build products already moved remain preserved under /private/tmp/learning-trails-build6-generated-duplicates.

Apple public build 5 was observed Waiting for Review with manual release selected; no public-release action was taken. Replace the older candidate only after the corrected candidate is verified and the required reviews are complete. Do not release build 5 as though these fixes were included.
