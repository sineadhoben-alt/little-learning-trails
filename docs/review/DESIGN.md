# Artistic direction and inclusive design review

Date: 26 September 2026. Reviewer: Codex, AI-assisted design review. No human artistic-director credentials or child testing are claimed. This is evidence for an experienced children's educational-app artistic director and accessibility specialist to validate, not their professional sign-off.

## Evidence and recommendation

Reviewed `src/App.tsx`, `src/Diagram.tsx`, `src/StoreButtons.tsx`, `src/TurtlePad.tsx`, the review brief, and the saved screenshots `docs/app-preview.png` and `docs/teacher-approval.png`. Source references below refer to the reviewed version. The screenshots show the home and parent screens; they do not establish the appearance of every activity or every device. No live browser or native interaction, screen-reader session, or child session was performed by this reviewer.

**Recommendation: not ready for an inclusive public release on design evidence alone.** Resolve the diagram readability and access findings, verify narrow-screen and large-text behaviour, and conduct human accessibility and child usability testing. The visual system is a promising prototype, but child appeal is unvalidated and the main journey presently favours introductory copy over learning actions.

What is working: calm cream/green palette, generous spacing, clear textual subject labels, non-punitive language, no compulsory timer or streak, large standard buttons (48 logical pixels minimum), textual equivalents for many diagrams, and an honest distinction between teacher approval of the approach and activity-level review. The body muted colour `#53665E` against cream `#F8F7F1` measures approximately 5.70:1; the input outline `#82988A` against white measures 3.08:1. Do not indiscriminately darken every surface or add decorative animation.

## Prioritised findings

### D1 — High: essential diagram features have weak contrast

Evidence: `src/Diagram.tsx:24` uses orange `#E9AA54` for the angle arc against `#F2F5ED`, approximately **1.84:1**. `src/Diagram.tsx:27` uses coordinate-grid lines `#BDD0C5` against that same surface, approximately **1.47:1**. These lines carry mathematical meaning. The dark main rays are clear, but the curved interior-angle marker and the grid can disappear for learners with low vision. Ratios were calculated from source sRGB colours using relative luminance; they are not screenshot sampling estimates. Decorative card borders are not automatically failures merely because they have low contrast.

Correction: use a darker accent for instructional strokes, increase thin grid strokes where needed, and retain differences in shape/line style. Acceptance: every essential diagram line/marker reaches at least 3:1 against adjacent colours, remains distinguishable in greyscale, and is checked on both mobile platforms. Reference: [W3C non-text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

### D2 — High: diagram labels shrink inside a fixed SVG canvas

Evidence: `src/Diagram.tsx:6` defaults labels to 14 SVG units (12 for place value, line 39); line 41 sets a 300-unit viewBox with width 100% and height 190. The diagram sits inside page, lesson, and diagram padding (`src/App.tsx:76`). At a 390 logical-pixel window its available width is about 268 pixels, making 14-unit labels about 12.5 pixels and 12-unit labels about 10.7 pixels; at 320 pixels these are about 9.2 and 7.9 pixels. Ordinary React Native text scaling does not automatically enlarge these SVG labels. Text descriptions help, but do not let a child inspect larger mathematical labels. The long place-value sentence is also a clipping risk inside a single unwrapped SVG label (`Diagram.tsx:39`).

Correction: move explanatory sentences outside SVG; offer an accessible full-screen diagram view with large labels, or responsive label/layout variants. Keep descriptions available and avoid requiring pinch precision. Acceptance: inspect every diagram at 320, 390 and tablet widths and at 200% text; all values remain readable and no text, axis labels or instructional marks clip. The measured size concern is source-derived; confirm rendering on devices. Reference: [W3C resize-text guidance](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).

### D3 — Medium: garden layout intrudes into narrow-screen panel padding

Evidence: `src/App.tsx:52` permits a width of eight squares. At narrow widths the fixed cell width is 24, gap 3, and garden padding 15 on both sides (`App.tsx:76`): eight columns need 243 pixels. At a 320-pixel screen, page padding 44 plus lesson padding 44 and borders leave about 230 pixels. The root reviewer subsequently verified in the browser that the garden is 243 pixels wide, starts at x45 and ends at x288, while page scrollWidth and viewport are both 320 pixels. It therefore intrudes into the lesson's right padding by about 13 pixels; it does **not** produce offscreen clipping or horizontal page overflow in that browser check. Native and large-text behaviour remain unverified.

Reproduce: use a 320-pixel-wide display, open garden, increase width to eight; repeat with large text. Correction: calculate square size from container width or provide an explicitly labelled expanded diagram. Acceptance: the garden fits its intended content area, no cells or controls clip, and all 64 squares remain countable without hiding the task. Record native evidence before closing.

### D4 — High: drawing-program alternative omits the path needed for reasoning

Evidence: `src/TurtlePad.tsx:5` announces only the number of forward moves and final position. Different paths and shapes can have the same move count and endpoint. It does not expose intermediate vertices, segment lengths or final heading, so a learner unable to inspect the polyline cannot independently examine the drawing. The visual output also has no visible coordinate grid despite distances being described as grid units, and it automatically rescales to its bounds, so different-length programs can appear the same size.

Correction: add a structured, selectable text trace (move number, start/end coordinates, distance, turn/heading), a visible unit grid or scale, and named start/end markers. Keep decorative motion optional. Acceptance: a screen-reader user and a sighted user can both determine whether a supplied rectangle program closes, locate the incorrect turn, and compare side lengths from equivalent information. Actual VoiceOver and TalkBack testing is required.

### D5 — High: learning state changes need complete assistive-technology verification

Evidence: `src/App.tsx:29` changes screen and scroll position without focus transfer. Main feedback has a polite live region (line 62), but the new hint (line 63), save status in the footer (line 71), and adult-review update (line 65) have no explicit announcement. Strand-filter selected state is only communicated by button colour (`App.tsx:15,48`); the generic Button only declares disabled state. Navigation tabs do declare selection (line 72), which should be retained.

Correction: on navigation place accessibility focus on the new screen title; expose the active filter's selected state and a visible non-colour indicator; announce meaningful save failure/hint/adult-review changes without announcing every keystroke or every background save. Acceptance: complete a Maths and English activity with VoiceOver and TalkBack, including hint, error, correction, adult review and return navigation, without hunting for changed content. This is a code-supported risk, not a claimed reproduced screen-reader failure. Reference: [W3C status-message guidance](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).

### D6 — High: children can enter adult controls directly

Evidence: Parents is a normal navigation tab (`src/App.tsx:40,72`); line 69 exposes editable business URLs, an owner-verification checkbox, nickname changes and destructive reset. Adult-rating controls are also directly available in child activities (line 65). A label saying adult/owner does not establish that the actor is an adult. The reset has useful confirmation, but a child can still erase their work. The store button itself correctly identifies the separate app and the disabled Android availability (`src/StoreButtons.tsx:8`).

Correction: remove release-time business editing from family installations, put adult settings/external destinations behind an accessible parent gate, and design adult-rating handover so its limits are clear. A gate is not identity proof. Acceptance: ordinary child navigation cannot edit destinations or inadvertently reset progress; the intended adult can access settings with accessible instructions; cancellation returns to intact child work. This is a product safeguarding/usability finding, not a legal or store-policy ruling.

### D7 — Medium: home screen spends the first view on introduction instead of discovery

Screenshot `docs/app-preview.png`: the first 765-pixel-high saved image shows a large greeting panel, another invitation, a section introduction and topic buttons. Only the very top of the first activity card is visible above navigation. `src/App.tsx:41,47,76` uses a 145-pixel decorative area on each topic card and repeats the same ring/dot/glyph composition. This can feel like a parent-facing website rather than an activity space; that judgment needs child validation.

Correction: after onboarding, use a compact greeting and a specific resume card naming the unfinished activity and level. Show a meaningful activity choice in the first viewport, then compact subject/strand discovery. Use artwork to explain the activity: a basket with coins, a garden grid, a story scene with a clue. Avoid random emoji-style rewards or a mascot that competes with instructions. Acceptance: at 390×844, children can identify the current activity and begin or switch subject without reading the entire hero; test this rather than assuming a visual preference.

### D8 — Medium: progress and catalogue screens become long, repetitive lists

Evidence: `src/App.tsx:68` renders all 62 progress panels with three level buttons each. The subject pages display all cards by default (line 48). The title “My learning trail” promises a journey, but the implementation is a full task index. There is no visible sorting for unfinished work, recent activity or subject on progress.

Correction: prioritise unfinished/recent work, offer Maths/English and strand filters, and use compact expandable topic rows. Represent checked answers, saved reflections and adult-reviewed work with separate labelled states. Keep total counts secondary to the child's next action. Acceptance: a returning child can find their most recent unfinished activity and an earlier piece of writing without scrolling the full catalogue; a parent can distinguish an answer check from a self-report.

## Coherent art direction to implement

Use **a curious explorer's field notebook**: warm paper, dark evergreen type, a limited set of nature-inspired subject accents, and clean editorial illustrations of things the child can investigate. Preserve “Little Learning Trails” and the explicit “Maths & English · Northern Ireland KS2” subtitle. Retain the friendly voice but test the word “little” and repeated diminutives with P7 pupils; the chosen brand need not change to make the activities feel more mature.

- Home: compact name/greeting; one clear resume card; two subject routes; a small selection of illustrated activities with short action-based descriptions. Avoid a compulsory linear path.
- Activity: title, current level, short mission, immediate working area. Move adaptation explanations to an optional “About my level” disclosure. Put help beside the task and show calm, specific success/error feedback. Put a “You will need…” line before starting paper/partner activities.
- Diagrams: one consistent dark stroke, minimum usable label size, clear scale when needed, deliberate shading, meaningful text alternative, and task-specific examples. Diagram checks belong in content review as well as design review.
- Writing: a labelled planning scaffold and comfortable full-width editor, separate from adult-review controls. Retain the child's words when moving between plan, draft and review.
- Parent area: a concise overview with expandable details for coverage, progress, storage and the separate Transfer Trainer NI promotion. Preserve the accurate teacher-approval qualification in `docs/teacher-approval.png`; avoid placing an approval badge where it could imply all content has independent sign-off.
- Navigation: replace unrelated text glyphs with a small consistent vector-icon set while retaining labels and selected-state cues. Keep stable location and generous targets. The current on-screen star brand mark and the book/path app icon should become a coordinated identity.

## Annotated screen recommendations

The numbered callouts below refer to locations in the two supplied 588×765-pixel screenshots. Coordinates are approximate image coordinates for the designer, not measurements of device layout. These are annotations of existing evidence, not proposed screens presented as implemented work.

![Reviewed home screen](../app-preview.png)

| Callout | Existing screen location | Observation and specific revision |
| --- | --- | --- |
| H1 | Header, x20–568 / y44–119 | Keep the clear Maths & English subtitle. Coordinate the star mark with the book/path app icon; use one consistent identity. |
| H2 | Greeting panel, x20–568 / y139–394 | Reduce its height after onboarding. Replace the generic “Continue my adventure” with the saved activity title, level and a short resume action. |
| H3 | Notice, x20–568 / y414–501 | This repeats the invitation already made in the greeting. Remove or collapse it after the first visit, freeing space for a real learning choice. |
| H4 | Topic buttons, x20–408 / y591–638 | Keep direct access to Maths and English. Bring these routes and the first meaningful activity card higher in the initial view. |
| H5 | Card edge, x20–568 / y659–693 | The learning activity is barely visible. Use a smaller contextual illustration and show its title/action before the bottom navigation. |
| H6 | Bottom navigation, y693–765 | Retain labels and generous targets. Standardise glyphs and ensure active state has both semantic selection and visible non-colour emphasis. Move sensitive parent controls behind an accessible gate. |

![Reviewed parent screen](../teacher-approval.png)

| Callout | Existing screen location | Observation and specific revision |
| --- | --- | --- |
| P1 | Heading/introduction, x20–568 / y8–177 | Add a concise overview of this child's saved work and the practical actions an adult can take. The current motivational title can be secondary. |
| P2 | Approval notice, x20–568 / y202–445 | Preserve both attribution and the limitation that individual activity review is pending. Do not shorten this to an unqualified badge. |
| P3 | Learning panel, x20–568 / y467–693 | Separate checked answers, reflections and adult-reviewed work into clearly labelled rows; move the long rules explanation into an expandable detail. |
| P4 | Beyond the shown viewport | Place storage/reset and Transfer Trainer NI under clearly separate sections. Do not bury essential saved-progress information beneath the full catalogue. The supplied image does not show these sections; recommendations use source review. |

The root review's `progress-failure.png` documents a separate saved-progress blocker. That defect takes precedence over cosmetic revisions; visual polish must not imply release readiness while saved work can become unreadable.

## Proposed human validation; not yet performed

Recruit with the owner's school/parent consent process, using fictional nicknames and no uploaded pupil work. An experienced children's-app artistic director and qualified KS2 teachers should observe short, supervised sessions spanning P5, P6 and P7, including pupils with different reading confidence, motor/access needs and device familiarity. A small first round of approximately 6–9 pupils can expose usability issues; it cannot prove universal appeal or learning outcomes.

Ask each child to: find a topic they recognise; explain what a card offers; complete a Maths task with a diagram; recover from an incorrect answer; use a hint; draft and resume English work; find their earlier work; and explain which controls are for adults. Observe navigation errors, reading burden, assistance required and frustration. Ask what feels too young, too serious or confusing without leading them toward a preferred design.

Run separate adult accessibility sessions with VoiceOver/TalkBack, 200% text, high-contrast/greyscale checks, keyboard/switch navigation where available, and small-screen devices. Record device, OS, build, settings, result and evidence. Re-test revised screens with a second small group. Keep child quotes anonymised and distinguish observed behaviour from inferred preference.

## Design sign-off checklist

- [ ] D1 essential graphics contrast corrected and measured.
- [ ] D2/D3 all diagram and garden layouts checked at narrow widths and large text.
- [ ] D4 drawing path has equivalent visual and nonvisual inspection.
- [ ] D5 complete core journeys pass native screen-reader testing.
- [ ] D6 adult settings, destination editing and reset are appropriately separated.
- [ ] Home/progress revisions tested for finding and resuming work.
- [ ] Human artistic director records age-appropriate design review and actual qualifications.
- [ ] Human inclusion specialist records accessibility testing and remaining limitations.
- [ ] Supervised child sessions recorded; no claim of child appeal before evidence exists.

No app code or saved learner data was changed during this review.
