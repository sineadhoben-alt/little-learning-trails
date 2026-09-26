# Little Learning Trails — Maths & English

A local-first Northern Ireland KS2 P5–P7 learning app. React Native + Expo, with iOS, Android and web targets. Version 0.2.0 is a supervised-beta candidate, not a published or human-approved release.

## Run

Use Node 22.6+ and pnpm. From this directory:

```sh
pnpm install --frozen-lockfile
pnpm web
```

Open http://127.0.0.1:8085. Use `pnpm ios` or `pnpm android` for an installed simulator/emulator with Expo Go. For a physical device, use `pnpm start` and a reachable LAN address. The computer must keep serving the development preview. Native standalone builds bundle learning content for offline use; store links need internet.

```sh
pnpm typecheck
pnpm test
pnpm coverage
pnpm export
```

See [project handover](docs/HANDOVER.md), [curriculum register](docs/CURRICULUM.md) and [verification record](docs/TESTING.md).

## Structure

- `src/content.ts`: activity types, eight interactive adventures, combined catalogue and official sources.
- `src/maths.ts`, `src/english.ts`: expanded topic content; `src/authoring.ts`: authoring helpers.
- `src/coverage.ts`: curriculum statement-to-activity map.
- `src/model.ts`, `src/persistence.ts`: answer checks, transparent practice suggestions, narrow legacy recovery and ordered saving.
- `src/*Learning.ts`, `src/learning.ts`: 186 modelled steps and 629 additional variants.
- `src/*Projects.ts`, `src/projects.ts`, `src/ProjectWorkspace.tsx`: 88 guided projects and saved writing/data/picture work.
- `src/ParentGate.tsx`, `src/parentAccess.ts`: local adult gate and persistent retry limits.
- `src/App.tsx`: reusable screens and local saving.
- `src/Diagram.tsx`, `src/TurtlePad.tsx`: educational diagrams and drawing commands.
- `src/StoreButtons.tsx`: verified Transfer Trainer NI iOS link and Android coming-soon control.
- `tests/*.test.mjs`: content, calculations, progression, project retention, save-order/failure recovery and parent-access tests.
- `docs/review/NEXT-ACTIONS-IMPLEMENTATION.md`: all 88 review rows mapped to additions.
- `docs/evaluation/`: planned anonymous human evaluation, distribution and per-item approval records.

No account or API key is required for core learning. Version 0.2.0 (build 3) has uploaded to Google Play internal testing and Apple TestFlight. Tester access, educational review and supervised evaluation remain pending; this is not a public-release approval. Pricing is undecided.
