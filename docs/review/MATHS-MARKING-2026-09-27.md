# Maths marking repair — 27 September 2026

Owner clarified the exact question: “Build a 2m by 4m rectangle. One quarter is a pond. What area remains in m²?” Their answer was 6. This is garden:2:1. The answer is correct: 8 − 8/4 = 6. Their earlier description of a 4 × 2 drawing exposes a confirmed orientation bug: the old grader requires width=2 and height=4 and rejects the same rectangle rotated to width=4 and height=2. Both orientations now pass. This reproduces a concrete way the correct answer and correct rectangle were rejected. Owner physical-device retest is still pending.
Confirmed defect: the old grader combined a correct numeric answer with construction/basket/tile requirements into a single false result, displayed generic “Not quite yet”, and increased unsuccessful attempts. A 4 × 2 drawing with answer 8 against the 3 × 2 anchor mission reproduces this misleading message. Equivalent decimals beyond two places were also rejected.

Changes for build 6:
- Every one of the 640 closed maths questions is checked against its stored answer and a separate domain calculation derived from question quantities, following the teaching method described in the hint. No network/AI service, answer-key copying, or parsing of the answer explanation is used for the second calculation.
- Exact question/guidance inputs are frozen in mathsQuestionSignatures.ts. New or changed inputs require checking the independent rule and explicitly updating this register. It deliberately excludes the answer key, so a bad key can be detected independently. Do not regenerate blindly as part of a build.
- A key/calculation conflict or unchecked question produces an app-error message, retains work, and cannot increase unsuccessful attempts or complete the question.
- Garden dimensions accept either orientation: rotating the same rectangle does not change area, perimeter or the pond fraction. Exact garden:2:1 regression accepts 6 in both orientations and rejects 8.
- Construction and selection requirements have separate incomplete feedback. Correct maths for the current garden drawing is acknowledged. The child can then finish the mission's dimensions. Basket and tile feedback is similarly specific; duplicate/out-of-range tiles cannot pass.
- Blank/malformed input is an input issue, not an unsuccessful maths attempt. Equivalent decimal forms are accepted.
- A visible question reference and build number identify future reports precisely.
- No saved work, history, or records are erased. Old unsuccessful attempts cannot be reliably reconstructed from the existing aggregate count and are not silently rewritten.

Verification:
- Independent calculations agree with all 640 stored keys; each item accepts its correct response and rejects an incorrect response only when the checks agree.
- Deliberately wrong keys tested against correct, incorrect and changed-key responses for all 640 items: fail safely. Changed prompts, hints and explanations also fail safely.
- Regression covers the reported 4 × 2 / 8 combination, matching and rotated dimensions, perimeter, pond remainder, unfinished baskets, duplicate/invalid tiles, and damaged question inputs.
- Browser UI: exact pond question garden:2:1 with rotated 4 × 2 rectangle and answer 6 completes successfully (pond-answer-six-build6.png). 4 × 2 / 8 for the area construction task is explicitly acknowledged; matching 3 × 2 / 6.000 completes successfully. Reopening preserves completion and work. This is browser verification, not a physical iOS test.
- All 40 automated tests and the strict type check pass.
- Physical-device confirmation of the owner's original report remains pending after installing build 6. Qualified educational review remains pending. Two agreeing software checks are a safeguard, not proof of flawless teaching or assessment.

Release remains a supervised beta. Store upload status is recorded separately in docs/store/UPLOAD-STATUS.md.
