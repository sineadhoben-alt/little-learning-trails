# Learning integrity — permanent owner requirement

Correct, fair marking is the app's highest product priority. These requirements apply to both Maths and English and to all future edits. The app must refuse unsafe marking rather than penalise a learner. They also govern diagrams, worked examples, hints, question banks and stored responses.

## Exactly one result, with all equivalent valid forms

An automatically marked item must specify enough information to determine exactly one correct result. Its offered options must contain precisely one defensible answer. A correct numeric value may have equivalent decimal spellings; a rectangle may be rotated; irrelevant option order or selection order must not affect correctness. If spelling or punctuation itself is being tested, that criterion must be explicit and significant differences must not be normalised away.

Open writing, discussion, personal preferences, multiple supported interpretations and investigations do not have a unique answer. Mark them as adult-reviewed activities, with evidence and a rubric, never automatically right or wrong. Reword an ambiguous closed question, supply the missing context, or move it to adult review. Do not force one arbitrary answer to satisfy a uniqueness assertion.

## Mathematical meaning precedes implementation order

Apply brackets first, then powers; multiplication and division share precedence and proceed left to right, as do addition and subtraction. “Divide, then subtract” must act on the specified quantity in that sequence. Check units and conversion, negative signs, decimal precision, fractions, percentage bases, rounding instructions, bounds and geometric equivalence. Never use JavaScript string evaluation or a prose guesser as the authority. Independently check the actual operands and the supplied diagram/table against the question, hint and explanation.

## Evidence required for each closed question

1. Stable item reference and explicit assessment criterion.
2. Answer derived independently from the answer key, with a relevant rule or exact passage evidence.
3. A second review of the question, hint, explanation, diagram and every offered distractor. Exactly one offered answer must be defensible under the stated criterion.
4. Regression checks for correct, incorrect, blank, malformed and equivalent responses, corrupted keys, changed inputs, and applicable order/rotation cases. Include the owner's garden:2:1 pond report permanently.
5. Freeze the reviewed question inputs so unreviewed edits fail closed. A snapshot alone is not an independent answer check.

Grader conflicts, unsupported content and incomplete controls must not create an incorrect learning result or an unsuccessful attempt. Keep the learner's work and give a clear app-error or incomplete-input explanation. Invalid metadata must be rejected before computation. Do not count unchecked reflection as mastery.

## Every-edit and release gate

Run the repository integrity command after each logical edit and before each export/native package. It includes strict type checking, exhaustive bank checks and regression tests. Do not waive a failure, reduce expected coverage or automatically refresh a register to obtain green results. Record changes and checks in the audit report. Check native behaviour separately; a passing browser test is not physical-device evidence.

Software checks cannot prove that all educational material is flawless. Qualified subject reviewers must approve the exact changed content and the owner must confirm physical-device behaviour before public release. Keep all uncompleted reviews explicitly pending.
