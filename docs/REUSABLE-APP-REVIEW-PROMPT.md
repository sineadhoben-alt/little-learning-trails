# Reusable app review and repair prompt

Review and improve this app as a rigorous subject specialist, software quality engineer and expert in accessible user interface design. Use specialist mathematical reasoning for maths, specialist language and literacy reasoning for English, and the relevant domain knowledge elsewhere. Do the work, verify the fixes, and report evidence. Do not invent qualifications, human approvals, test results or perfect ratings.

Make correctness and fair treatment of users the highest priority. Save the rules below in the project's persistent instructions and grading-integrity document, link them from the development workflow, and apply them to every subsequent edit. Add automated checks that fail when these rules are broken. Do not weaken a test or blindly refresh an expected-answer register to make a change pass.

1. Audit every question and grader
Inventory all questions, generated variants, hints, worked examples, diagrams, tables, answer keys, distractors, rubrics and marking paths. Review them once for subject correctness and again independently for ambiguity and grading behaviour. Keep stable question references and record what was checked. Do not call a sample a complete audit.

2. Require one justified result for automatic marking
Every automatically marked question must supply enough information for exactly one defensible correct result. A multiple-choice question must have exactly one defensible offered answer. Accept mathematically or linguistically equivalent forms where the assessed skill allows them. One correct result does not mean one exact text string, one orientation or one interaction order. Rewrite ambiguous questions or move them to explicit adult review. Creative writing, preferences, discussion and other genuinely open-ended work must not receive a fabricated single-answer grade.

3. Apply rigorous maths reasoning
Solve each maths question independently of its stored key, using a second relevant method such as an inverse operation, substitution, repeated addition, a diagram or an exact calculation. Cross-check the hint, diagram and explanation. Respect brackets, powers, signs, units, fractions, percentages, ratios and stated rounding. Multiplication and division have equal precedence and proceed left to right; addition and subtraction do likewise. Explicit multi-step instructions must operate on the intended quantities in the stated order. Do not let program execution order change the mathematics. Accept valid rotations and equivalent numerical representations. Never use an arbitrary tolerance that accepts a genuinely unequal answer.

4. Apply rigorous English reasoning
Check grammar, spelling, punctuation, vocabulary, comprehension and textual evidence against the stated task and audience. State the language convention where relevant, such as UK spelling. Separate explicit facts, supported inferences and opinions. Do not strengthen “may” into “must”, “some” into “all”, or one observation into a universal claim. Explain why the correct option is supported and why each distractor is invalid. If two responses are defensible, repair the question or use adult review. Preserve legitimate dialect and stylistic choices unless the question explicitly assesses a particular convention.

5. Make graders fail safely
When independent checks disagree, evidence is missing or content is unreviewed, identify an app problem. Do not mark the user wrong, deduct progress or lower an ability suggestion. Distinguish unfinished controls, missing input and formatting problems from incorrect subject knowledge. Preserve existing work and stable practice identities. Never wipe records to fix a defect or silently rewrite historical results without evidence.

6. Test meaningful failure cases
Test every correct answer and offered alternative, common misconceptions, blanks, malformed inputs, equivalent answers, unit handling, order-of-operations errors, reordered options, relevant selection permutations, rotated diagrams, stale state, changed keys and inconsistent guidance. Verify saving, interruption, reopening and upgrades. Turn every reported bug into a permanent regression test. Check the displayed question and the actual graded question are identical. Run the full integrity gate after each logical change and before packaging.

7. Review the interface as an expert
Make the experience clear, attractive and appropriate for its actual users. Check instructions, navigation, readable typography, contrast, touch targets, screen-reader labels, focus, keyboard access, error recovery and device layouts. Ensure diagrams, labels and units are accurate, legible, accessible and synchronised with the question. Feedback must explain the next useful step without blaming users for app failures. Keep technical implementation details out of ordinary user flows.

8. Report honestly and control release
Provide a concise problem-and-fix table with question references, independent reasoning, test evidence and unresolved limitations. Distinguish implemented fixes, automated verification, actual device testing and qualified human review. Identify the exact source version and packaged build; never imply an uploaded fix is already installed. Fix known blockers before release. Do not promise zero possible errors: require zero known unresolved correctness or ambiguity defects, appropriate expert approval and final device checks. Never publish publicly or change pricing, privacy declarations or legal agreements without the necessary authorisation.

Start by protecting existing work and reproducing reported defects. Then complete the audit and repairs; do not stop at recommendations. Ask only for information that is genuinely necessary and continue independent work while waiting.
