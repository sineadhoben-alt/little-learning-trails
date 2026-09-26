# Candidate review and sign-off

**Current decision: PENDING — no human approvals recorded.** This is a pending human decision record with an identified engineering snapshot. Preparing it, passing software tests or participating in a session does not constitute approval.

Candidate name/version: **Little Learning Trails — Maths & English 0.2.0 (build 2)**
Source manifest SHA-256: **8dde2d9d99ac06240096c91bb6901a23ced1bd5503e9d218e49235bd87202131**
iOS simulator build 2 / archive SHA-256: **273b350063953e430dbc33530b50bd9e8ca552ac789899d2039630b53bd70284** (not TestFlight)
Android build 2 / local APK SHA-256: **ac7eb0b7c382a36eb5843c479272a9d01e79de9111b58c2424b63402ac72c7f9** (development signing)
Engineering snapshot: **2026-09-26T20:30:49.754Z**; owner freeze confirmation remains pending.
Candidate verification/build-evidence reference: [Candidate evidence and limitations](../review/CANDIDATE.md)
Scope proposed: NI KS2 P5–P7 supplementary supervised beta; exact authorised device/distribution scope remains pending owner and reviewer decisions.

Use reviewer codes. The owner verifies the identity/authority behind each code privately and retains that evidence separately. Do not publish names or signatures. Do not alter review dates or carry an approval silently to a changed build.

## Required evidence

| Area | Evidence required | Evidence reference | Status |
| --- | --- | --- | --- |
| Maths | Verified NI KS2 reviewer; actual task/level review; answer, diagram and progression checks; coverage limits recorded | [ ] | Pending |
| English | Verified NI KS2 reviewer; reading, writing, talking/listening and adult guidance reviewed; coverage limits recorded | [ ] | Pending |
| Artistic direction | Relevant experienced human review; actual child feedback distinguished from adult opinion; age-appropriate findings addressed | [ ] | Pending |
| Inclusion/access | Actual large-text, screen-reader and core navigation evidence on supported devices; unresolved barriers listed | [ ] | Pending |
| Child/family usability | Consented/assented supervised sessions; actual P5/P6/P7 and device coverage/gaps; coded observations and retests | [ ] | Pending |
| Technical reliability | Identified installed builds; saved work/restart/offline/error/reset/independent device checks; blockers fixed and retested | [ ] | Pending |
| Claims and parent controls | Release wording matches evidence; teacher approval qualified; external destinations and destructive actions reviewed | [ ] | Pending |

## Explicit human decisions

Each reviewer completes or explicitly confirms their row. An owner must not interpret silence as approval. “Approved with conditions” does not authorise release while mandatory conditions remain unmet.

| Reviewer code / responsibility | Verified relevant experience reference | Scope actually reviewed | Exact candidate | Decision | Mandatory conditions / limits | Confirmation date and private reference |
| --- | --- | --- | --- | --- | --- | --- |
| [T__ / Maths] | [ ] | [ ] | [ ] | Pending | [ ] | [ ] |
| [T__ / English] | [ ] | [ ] | [ ] | Pending | [ ] | [ ] |
| [code / artistic direction] | [ ] | [ ] | [ ] | Pending | [ ] | [ ] |
| [code / inclusion/access] | [ ] | [ ] | [ ] | Pending | [ ] | [ ] |
| [code / technical quality] | [ ] | [ ] | [ ] | Pending | [ ] | [ ] |

Allowed decisions: **approved within stated scope / approved with conditions / not approved / unable to review / pending**. A person may cover multiple roles only where relevant experience and actual review are recorded. Keep parent/child feedback as evidence; do not ask children to approve a release.

## Release-blocker and retest register

| Issue ID | Impact / required correction | Fix candidate | Retest evidence / device | Reviewer code | Status |
| --- | --- | --- | --- | --- | --- |
| [ ] | [ ] | [ ] | [ ] | [ ] | Open / fixed awaiting retest / closed |

Include incorrect content, misleading scope/approval claims, serious access barriers, lost or mixed progress, and broken core journeys. Do not downgrade a blocker merely to meet a release date.

## Owner release decision

- [ ] Candidate matches the actual reviewed/tested installed artifacts.
- [ ] Relevant human expertise has been verified privately; shared records remain coded.
- [ ] Required subject/design/accessibility decisions are explicit and apply to this candidate.
- [ ] All mandatory conditions and release blockers are closed with retest evidence.
- [ ] Missing device/group coverage and remaining limitations are recorded and reflected in release scope.
- [ ] Android community and online-parent feedback is distinguished from supervised child evidence and qualified curriculum approval; the limited iOS sample is stated without generalising Android results to iOS.
- [ ] Supervised sessions actually occurred; no invented or overstated child-testing claim.
- [ ] Parent information, app wording and promotional claims match the evidence.

Decision: **[hold / approve only stated supervised-beta scope / approve stated public-release scope]**
Owner confirmation reference/date: **[ ]**
Reason and limitations: **[ ]**

A supervised-beta decision is not public-release approval. Until an explicit decision is recorded, the candidate remains on hold for that scope.

## Freeze and re-review rule

After freeze, log every change with affected files/content, reason, new revision/build and required retests. Content/answer/diagram changes reopen affected subject approval; navigation, interaction, text or layout changes reopen relevant usability/access review; persistence, dependency or native configuration changes reopen technical checks. Rebuild and identify the new candidate. Reviewers may explicitly carry forward unaffected evidence with a reason, but no approval transfers automatically. Root release tooling supplies the actual version/hash/build proof; these blanks must never be treated as proof.
