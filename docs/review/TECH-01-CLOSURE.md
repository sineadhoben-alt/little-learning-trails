# TECH-01: saved basket recovery

26 September 2026 · fixed in candidate 0.2.0; evidence below is software/UI evidence, not a claim that every external tester device has already been repaired.

The former edit-by-index code could leave holes before the first changed basket item. Serialisation turned those holes into null, which the reader rejected and consequently prevented reopening the family's entire record.

Basket edits now create a complete numeric array. Loading performs a narrow migration for known shop drafts only: valid null/missing slots become zero and valid counts are retained. Unrelated fields, writing, results and family/business settings are preserved. Unrelated corruption fails safely and is neither overwritten nor automatically erased. The recovery screen offers retry rather than a destructive reset.

`tests/persistence.test.mjs` reproduces all six edit orders for three shop steps, every intermediate increment/decrement and reload. It also covers legacy null arrays, unrelated preserved fields, invalid mixed records, failed reads/writes, recovery/retry and asynchronous write ordering. These checks pass in the current test log. The prior reproduction script now passes.

Observed UI recovery: the isolated 127.0.0.1:8086 preview retained the previously broken basket. Reopening showed Apple 0, Juice 1, Bun 0 without reset; normal edits to Apple 2/Juice 1 then correctly checked £3 change. The following new question loaded with fresh counts. Screenshot: recovered-basket.png. No family records were wiped as a fix.

Remaining verification: the owner should include upgrade/reopen journeys in actual distributed Android/iOS testing. A simulator or browser result does not establish every physical-device interruption case. No cross-device repair/synchronisation is provided.
