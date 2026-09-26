# English teaching supplement and beta authoring record

26 September 2026. **AI-authored; qualified Northern Ireland KS2 English teacher sign-off and pupil validation pending.** The earlier independent AI review remains a record of the version it inspected; this supplement addresses some findings but does not turn that record into a professional approval.

## Added material

`src/englishLearning.ts` exports:

- `englishLearning`: all **27 English trail IDs**, including the four core English trails, each with prerequisites and three teaching steps: **81 original modelled examples**, explanations and worked responses.
- Every step contains concrete support/developing/secure criteria tied to the activity goal. The criteria distinguish conceptual prompting from ordinary accessibility support and make no whole-topic mastery claim.
- `englishAccessGuidance`: display alongside adult guidance. It permits suitable AAC, pointing, typing, dictation, scribing and usual access tools, while recording what the learner actually demonstrated. Unavailable partners/resources or unsuitable access mean “not yet observed”, not low ability.
- `englishPractice`: **17 activity/level banks × 4 additional tasks = 68 variants**. Each bank targets the same local subskill as its original task. The bank keys are `detective:0–2`, `words:0–2`, `grammar:0–2`, `spelling:0–1`, `reading-library:0–2`, `word-strategies:0–1`, and `spoken-written:0`.
- `englishAuthoringStatus`: a brief authored/pending-review label for reuse in the product.

The sentence-order banks retain `words` arrays, unique tokens and exact matching answer sentences; they are not substituted with recognition-only questions. Closed-answer variants have keyed answers, hints and explanations. Reading banks include new passages; they do not simply replay the original story.

Each step includes a model before independent work. Story teaching explicitly asks for a model, a jointly composed variation, then a separate draft. This begins to address supported writing, but cannot substitute for observing actual guided/shared teaching or a substantial text/writing programme.

## Corrections in the original English catalogue

Only `src/english.ts` was edited by this authoring assignment; activity IDs and the three existing task positions remain stable.

- The observation-record explanation no longer claims an unstated counting method is documented. It asks how the count was made before assessing reliability.
- The object-position instruction identifies the book explicitly and establishes the shared viewpoint.
- The grid-route task now supplies a reproducible 4 × 4 map, named destinations, starting orientation, three turns, a checked route and accessible ways to represent movement.
- The layout transformation task now supplies its source paragraph, materials and expected sequence.
- The report/poster task supplies imaginary event facts and distinguishes the before-event invitation from the after-event report.

Root integration should also keep repeat listening permitted in the core talking task. The detective extra-challenge model demonstrates recording and revising a personal interpretation; the closed main/variant questions still assess recognition of a character’s revision. Do not report those closed responses as proof that the learner independently reconsidered an earlier view.

## Checks completed

- Imported both exports successfully and verified all 27 English trail IDs have exactly three teaching steps.
- Verified all 17 banks contain four tasks and all option answers occur among their choices.
- Verified each word-tile task has the exact tokens needed by its answer; human-style semantic checking of each authored item was also performed by the AI author.
- Original and variant passages/answers were checked for the same immediate subskill, consistent hints and plausible interpretation. This is author checking, not independent professional sign-off.
- The full project TypeScript check is recorded separately by the integrating agent because other project files are being edited concurrently.

No App/model/test/core-content files were changed by this assignment. The integrating agent owns state, bank selection, evidence thresholds, migrations, UI and automated test coverage. Integration must keep item identity stable and avoid counting repeated exposure to the same item as independent new evidence.

## Remaining release limits and next teacher checks

The bank is finite, not a calibrated adaptive assessment. Cross-level tasks sometimes cover different subskills (for example sentence structure and spelling, or different reading genres). Multiple successful variants at one step are useful practice evidence, but do not establish that the next step is psychometrically harder or that a whole strand is secure.

A qualified NI KS2 specialist must check each example, all 68 variant keys/distractors, suitability for P5–P7 and different support needs, expected progression, and whether the rubrics produce consistent judgements on sample pupil work. Useful next work includes more independent application, real guided reading, a richer text library, longer-term writing portfolios, explicit spelling patterns and varied grammar editing/production. Speech, handwriting and external media tasks still need appropriate adult observation and materials.

Before beta, check that the model can be understood without being mistaken for the child’s required answer, that hints/models do not silently count as unassisted performance, that accessibility support is not penalised, and that switching between variants preserves each draft and result accurately. No educational or pupil-outcome claim should be upgraded solely because these materials have been added.
