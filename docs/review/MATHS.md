# AI-assisted Maths pre-release review

Reviewer: AI-assisted NI KS2 Maths reviewer, not a qualified human teacher. Date:26 September 2026. Human specialist validation is pending.

## Recommendation: not ready for unrestricted release as a fully adaptive, complete KS2 curriculum app

All **105 Maths tasks in 35 trails** were inspected: prompts, hints, answer keys/distractors, explanations/adult rubrics, and applicable diagram code. No incorrect closed-answer numeric key was found. The fixed bank and incomplete subskill coverage do not establish complete curriculum provision or adaptive ability assessment. A narrower practice-preview claim is more defensible after the specific fixes and human review. No supervised child sessions or native screen-reader testing were performed by this reviewer.

The official [CCEA KS2 Mathematics and Numeracy minimum-content document](https://ccea.org.uk/document/2066) was opened on 26 September 2026 and compared with all 47 Maths register rows. It is the NI-specific source, not an English National Curriculum substitute. The source remains publicly available as a CCEA statutory-requirements PDF; no independent evidence of supersession was found in this review.

## Findings and acceptance criteria

**Confirmed runtime release blocker, TECH-01 (root reviewer):** all shopping levels can lose access to saved progress when the second basket item is added before the first. Sparse array holes become null in stored JSON and the restore validator rejects the whole saved state. See [failure screenshot](progress-failure.png). Mathematical answer keys pass, but these three task rows are runtime-blocked until repaired and retested.

1. **High / release-scope blocker: coverage labels exceed depth.** src/coverage.ts maps every row, but mapping is not sufficient provision. The table below identifies specific omissions. src/App.tsx:69 already distinguishes topic coverage from mastery; retain that honesty and remove any wider complete-curriculum claim until subskills, teaching sequences and repeated practice are verified. Acceptance: each omitted subskill has meaningful teaching/practice/assessment evidence, or public scope is narrowed precisely.
2. **High: adaptation uses a single fixed answer to move between different subskills.** src/model.ts:8–16; src/maths.ts:39–46; src/content.ts:21–24. A successful 4×5 moves to 7×8, then a much easier 90÷10; data comparison moves to simple addition. Incorrect work is not analysed by misconception. Repeating the revealed answer can appear successful. Acceptance: subskill prerequisites, multiple unseen equivalent items and delayed checks; independent teacher judgement validates progression.
3. **Medium: some diagrams support a different concept from the active question.** src/Diagram.tsx half strips on quarter/percentage tasks; cube question shows a cuboid; ten-thousands task has no ten-thousands column. See flagged task rows. Acceptance: level-specific accurate visuals, labels and accessible descriptions tied to task quantities.
4. **Medium: wording and direct-entry dependencies.** volume:0 must say cubes exactly fill the box; frequency:2 should specify whole-minute recording; frequency:1 one choice per child; data-tools:1 must contain its starting table even when opened directly. Chance tasks should state fair, well-mixed selection. Acceptance: no inferred data or prior-level artefact needed.
5. **High inclusion improvement: practical tasks require resources/adults and sometimes several days.** Checklists are reflections, not quality scores. Add resources/time/partner labels before entry, printable templates, alternative response modes, accessible worked examples and a supported path below level 0. No reading assistance is implemented in the Maths content; language load may obscure mathematical ability. Acceptance: classroom trial across P5–P7 and varied support needs, with actual artefacts reviewed.
6. **Medium: mathematical representations need expansion.** Tally question uses 5+5+3 rather than tally marks; bars have printed counts but no plotted scale; geometry lacks task-specific nets, protractor steps, triangle/quadrilateral figures and measurement annotations. Acceptance: children can use the intended representation to reason, with equivalent nonvisual access, without merely reading a supplied total.

## Mathematical checks

Recalculation used integer pence for shopping, area/perimeter formulas, fraction proportions, finite sums/means, inverses, unit conversions and explicit shape geometry. All numeric answers and closed-choice keys were consistent. Open-task examples also checked: pencil unit prices 30 p/35 p, savings 3 weeks, square-net arrangement, coordinate translation and turtle rectangle closure. Borderline wording is recorded even where the intended key is correct. UK currency and metric units are appropriate; invented exchange rates are clearly identified.

The shared number line and 60° diagram are geometrically coherent. Clock hands represent approximately 3:30. Coordinate marker is correctly located at(3, 2). Compass directions are correctly ordered. Generic reused diagrams need contextual improvement rather than wholesale removal.

## Curriculum matrix

Every row is assessed below. Partial means an introductory opportunity exists, not a curriculum gap in every element. Gap means an identifiable required subskill is absent within the mapped topic. None is certified sufficient for mastery across KS2 from this finite bank.

|Row|Mapped activity IDs|Assessment|Evidence / next action|
|---|---|---|---|
|MP1|reasoning|partial; introductory activity present|Resource selection limited to counters/representation and household investigations; add genuine resource choices.|
|MP2|reasoning, collect-data|partial; introductory activity present|Most tasks supply needed facts; learner-chosen information sources weak.|
|MP3|reasoning, budget|partial; introductory activity present|Ordered number pairs and budget plans provide examples; repeat across contexts.|
|MP4|reasoning, mental|partial; introductory activity present|Reasoning and mental hints offer strategies; no systematic recovery sequence after errors.|
|MP5|reasoning, garden|partial; introductory activity present|Some spoken reasoning; garden auto-check only numerical outcome, not mathematical explanation.|
|MP6|reasoning|partial; introductory activity present|Partner comparison appears in seating problem; limited repeated opportunities.|
|MP7|coordinates, unknown, directions|partial; introductory activity present|Coordinate, equation and turtle representations present; use across problem contexts.|
|MP8|collect-data, data-tools|partial; introductory activity present|Charts and spreadsheet outputs require external evidence, not retained in app.|
|MP9|sequences, machines|partial; introductory activity present|Two numerical sequences and one devised rule; limited generalisation across spatial patterns.|
|MP10|reasoning|partial; introductory activity present|Three open investigations; useful starter examples, adult-led quality judgement.|
|MP11|reasoning, machines|partial; introductory activity present|Odd+odd proof strong example; machines mostly evaluate rather than formulate general rules.|
|MP12|estimate, reasoning|partial; introductory activity present|Rounding and proof checks present; insufficient transfer to daily problems.|
|MN1|place-value|gap within mapped topic|GAP: no whole-number counting or whole-number reading/ordering tasks; one digit-value and partition task do not cover breadth.|
|MN2|decimal-scaling, place-value|partial; introductory activity present|Decimal comparison/partition/scaling examples correct; only 3 scaling cases.|
|MN3|estimate|partial; introductory activity present|Nearest-ten/hundred examples; no wider rounding/estimation sequence.|
|MN4|fractions, fraction-links|partial; introductory activity present|Halves/quarters and 3/5 conversion sampled; broader fractional/decimal/percentage understanding and applications thin.|
|MN5|negative|partial; introductory activity present|Temperature and floor contexts coherent; repeated practice absent.|
|MN6|sequences|partial; introductory activity present|Add 4, double, devise alternating rules; limited range.|
|MN7|factors, tables|partial; introductory activity present|Factors/prime/cube/square sampled; multiples and inverse relationships insufficiently explored.|
|MN8|machines|partial; introductory activity present|Forward/backward machines correct; spatial/practical relationship generalisation missing.|
|MN9|unknown|partial; introductory activity present|Three clear unknown equations; no misconception-based or equivalent follow-up items.|
|MN10|mental|partial; introductory activity present|Compensation strategies sampled; no choice between multiple valid methods.|
|MN11|tables|gap within mapped topic|GAP: only 4×5, 7×8, 90÷10; cannot substantiate coverage of all facts through 10×10.|
|MN12|operations|partial; introductory activity present|One bracket calculation and two decimal examples; limited whole-number division/subtraction and written/mental method depth.|
|MN13|shop|partial; introductory activity present|Mapped shop tests multiplication/addition/subtraction, not division; add budget unit-price task to mapping and more money contexts.|
|MN14|budget|partial; introductory activity present|Open budget/payment discussions appropriate; depends on adult support.|
|MN15|budget|partial; introductory activity present|Unit pricing and saving examples correct; repeated independent decisions absent.|
|MN16|currency|partial; introductory activity present|Pound/euro examples appropriate; conversion is optional stretch, not full curriculum evidence.|
|MM1|measure-estimate|gap within mapped topic|GAP: length/mass/capacity/time estimates prompted; no area estimate or actual temperature estimate.|
|MM2|measure-estimate|partial; introductory activity present|Continuity/precision discussion present; needs hands-on varied resolutions.|
|MM3|units|partial; introductory activity present|Three metric conversions and one subtraction only; no broad measurement operations practice.|
|MM4|garden, volume|partial; introductory activity present|Rectangle perimeter/area and cuboid volume only; scaffold distinction and broader simple shapes.|
|MM5|scale|partial; introductory activity present|Two calculations and paper drawing coherent; diagram generic, not matched to each scale.|
|MM6|time|partial; introductory activity present|One half-hour clock, one conversion and one duration calculation; no genuine multi-entry timetable selection.|
|MS1|shapes, symmetry|partial; introductory activity present|Triangle/rectangle/pentagon, symmetry/tessellation/congruence sampled; broad construction/classification thin.|
|MS2|solids|gap within mapped topic|GAP: only cubes/cuboids; other common 3-D shapes and their properties absent.|
|MS3|directions|partial; introductory activity present|Eight-point visual and simple code present; anticlockwise/pattern generation lack assessed practice.|
|MS4|angles|partial; introductory activity present|One acute recognition, one triangle calculation, one practical angles task; little line language or progressive protractor instruction.|
|MS5|coordinates|partial; introductory activity present|First-quadrant plotting/translation adequate starter tasks; graphs are paper-based and generic diagram unrelated to later vertices.|
|MD1|collect-data|partial; introductory activity present|Three purposeful collection tasks; representations and sustained data practice depend on external work.|
|MD2|data, collect-data|partial; introductory activity present|Open investigations prompt conclusions; closed data answers alone do not show explanation.|
|MD3|frequency, data|gap within mapped topic|GAP: proportional bars and prose counts only; no broad graph/table range or creation of grouped frequency tables.|
|MD4|collect-data, data-tools|partial; introductory activity present|Record sheet and spreadsheet/filter tasks present; separate software and prior-level dependency impede independent use.|
|MD5|averages, data|partial; introductory activity present|Mean/range calculations correct; interpretation of typicality and outliers absent.|
|MD6|chance|partial; introductory activity present|Basic vocabulary covered in 3 bag contexts; no transfer or experimental exploration.|
|MD7|chance|partial; introductory activity present|Simple bag outcomes described; no learner-generated outcome lists or trials.|
|MD8|chance|partial; introductory activity present|Ordering and evens present; add direct less-than/greater-than-even comparisons and fair experimental contexts.|

## Task register and re-review

[maths-tasks.json](maths-tasks.json) contains a separate record for every task, with zero-based level plus displayed level, evidence, outcome and correction. All 105 are statically reviewed; all remain pending human specialist sign-off. No runtime behaviour pass is implied by a content pass.

Re-review ownership: NI KS2 Maths teacher/curriculum leader for mathematical accuracy, progression and coverage; inclusion specialist for accessible representations; product reviewer for direct-entry and retained practical work; child-research facilitator for consented usability sessions. Validate corrected items, equivalent banks and realistic uneven-ability journeys before approving release.
