# Little Learning Trails — pre-release review

**Recommendation: NOT READY for public release.**

26 September 2026 · App version 0.1.0 · AI-assisted review. The app is a useful working prototype, but a reproducible saved-progress failure blocks release. The current content and progression also do not support the intended fully adaptive, comprehensive KS2 programme. A supervised supplementary-learning beta is a realistic nearer target after the blockers and access issues are addressed.

## Who reviewed it

Separate AI review passes covered NI KS2 Maths, NI KS2 English, artistic direction/inclusive design, and technical/family use. They do **not** hold teaching qualifications or artistic-director credentials, and are not independent human professionals. The same assistant system helped build this app; this is not third-party certification. Qualified human Maths/English, artistic-direction and inclusion review remains pending.

Sinéad Hoben's teacher approval of the educational approach is retained as authorised. No claim is made that she has already checked every task. No children were contacted or observed, and no pupil outcomes or child-appeal results were invented.

## Evidence reviewed

- All **186 tasks**: **105 Maths** and **81 English**, across 62 trails. Prompts, hints, explanations, keys/distractors, passages, adult guidance and relevant diagrams were examined from source.
- All **88 curriculum mappings**, compared with the official CCEA minimum-content documents retrieved by the subject reviewers. These documents were available; a qualified NI curriculum lead must confirm applicability for the final release date.
- Current source, saved screenshots, persistence/adaptation code, fresh TypeScript and 15-test suite runs, targeted browser checks, an iPhone simulator smoke journey and native build logs.
- The review source snapshot is identified by [file checksums](reviewed-source-sha256.txt). All task-level human sign-offs remain pending. Source inspection is not equivalent to completing every task on every device.

The closed-answer keys reviewed were mathematically/textually consistent: no clearly wrong keyed answer was identified. That is a strength, but the existing passing tests missed the progress failure below.

## Prioritised decisions and fixes

| Priority | Finding and effect | Required change / acceptance evidence | Owner |
|---|---|---|---|
| **P1 — release blocker** | **Saved progress can become unreadable.** Add Juice before Apple, wait for save, reload: the app cannot load the whole learner record. Other work becomes inaccessible; it is not automatically erased. | Dense basket counts; recover existing null placeholders without discarding unrelated work; regression-test every item-first order and reopening. [TECH-01](TECHNICAL.md) | Developer + mobile QA |
| **P1 — release-scope blocker** | **“Fully adaptive” is not substantiated.** One fixed successful answer changes the level; unrelated subskills can follow; failed drafts do not themselves change the suggestion. Adult labels are unanchored and child-accessible. | Skill progressions, varied unseen items, repeated evidence, meaningful support and adult criteria; validated struggling/secure/uneven journeys. Narrow claims until this is done. [TECH-02](TECHNICAL.md) | KS2 Maths/English leads + developer |
| **P1 — curriculum-scope blocker** | **Topic mapping overstates provision if presented as comprehensive coverage.** Times tables use three facts; wider 3-D shapes and measurement/data subskills are missing. English needs guided/modelled/shared writing, much richer reading and spelling/grammar practice. | Fill the named subskill gaps and teaching/practice sequences or explicitly release a supplementary selection. Correct claims and re-audit the matrix. [Coverage matrix](CURRICULUM-MATRIX.md) | Qualified NI KS2 subject leads |
| **P1 — native release gate** | **Native distribution is not ready.** Android preview compilation succeeded with a debug signing key; iOS standalone build failed. Installed-release offline/reopen/device tests are incomplete. | Reproducible standalone builds, appropriate owner-controlled signing, real-device and upgrade/offline checks against the reviewed version. [TECH-03](TECHNICAL.md) | Mobile developer + QA |
| **High** | **Diagram access needs work.** Meaningful angle/grid lines have weak contrast, labels shrink on narrow phones, and the turtle alternative does not describe the path. | Legible scalable task-specific diagrams, sufficient contrast, equivalent path information, VoiceOver/TalkBack and large-text verification. [D1–D5](DESIGN.md) | Artistic director + inclusion specialist |
| **High** | **Adult controls are not separated from child use.** Children can label work secure, edit destinations and confirm reset. | Remove business editing from family builds; accessible adult handover/gate; clarify ratings and test cancellation. [TECH-04](TECHNICAL.md) | Product + inclusion + developer |
| **P2** | **Some tasks lack inputs or clarity.** Writing-layout task lacks its paragraph; spreadsheet task refers to previous work; instructions/grid tasks need clearer materials; some explanations overstate evidence. | Supply self-contained resources and correct the exact task rows. Direct entry at any level must work. [Task register](TASK-REGISTER.md) | Subject leads + content editor |
| **P2** | **The interface is calm but not yet validated with children.** Long introductory areas, repeated decorative cards and 62 progress panels delay access to activities. | Compact home/resume, meaningful illustrations, clearer resources and filtered progress; observe P5–P7 children using it. [Annotated design review](DESIGN.md) | Educational-app artistic director |

## What should be retained

The chosen name and explicit Maths & English/NI subtitle, warm restrained palette, generous controls, original content, non-punitive feedback, selectable levels, parent-focused promotion and honest distinction between reflections and checked answers are sound foundations. Practical, writing and talking/listening formats are preferable to forcing everything into a quiz. Keep these while improving depth and usability.

The existing Transfer Trainer NI icon and Apple destination are configured; Android correctly says coming soon. This review's web fetch could not independently re-open the Apple listing, so its current live destination remains a real-device recheck item rather than a new verification claim.

## Review pack

- [All 186 task reviews](TASK-REGISTER.md): findings and corrections, displayed levels 1–3.
- [All 88 curriculum rows](CURRICULUM-MATRIX.md): partial coverage and specific gaps.
- [Maths report](MATHS.md) and [English report](ENGLISH.md): subject reasoning, examples and review requirements.
- [Artistic direction and inclusion](DESIGN.md): numbered screenshot callouts, coherent visual direction and screen-by-screen changes.
- [Technical report and test matrix](TECHNICAL.md): reproducible defect, native-build evidence, privacy inspection and untested areas.
- [Machine-readable Maths](maths-tasks.json) and [English](english-tasks.json) task records.

## Ordered development and re-review

1. **Protect work first.** Fix TECH-01, recover affected stored drafts, add the failing-order regression and verify normal and abnormal saving. Do not solve it by wiping families' records.
2. **Make the intended beta scope honest and usable.** Resolve missing task inputs, improve diagram access, separate parent controls, repair native packaging and test standalone builds. Reword any comprehensive/ability claims unsupported by evidence.
3. **Build educational depth.** Qualified subject leads define subskill progressions, equivalent banks, modelled examples and anchored adult rubrics. Review each changed task and map the actual provision.
4. **Run supervised evaluation.** Recruit with appropriate consent through the owner; include P5, P6, P7, varied attainment and support needs, plus parents. Observe comprehension of instructions, recovery from errors, independence, appeal, fatigue and access. Do not treat this proposed study as completed.
5. **Freeze and sign off a release candidate.** Record version, named human reviewers and qualifications, per-task approvals, final device/accessibility results, remaining accepted limitations and corrected product claims. Recheck external links and release permissions. Public launch should follow only after blockers are closed and the relevant reviewers sign off.

No app changes or publication were made as part of this review. The report proposes corrections for the owner's consideration; it does not certify the app as released or ready.
