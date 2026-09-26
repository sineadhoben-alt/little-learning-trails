// Review-only reproduction. Does not read, write or erase real learner data.
// Expected to fail until the shop persistence bug is repaired.
import assert from 'node:assert/strict';
import {fresh,blankDraft,parseState} from '../../src/model.ts';
const state=fresh();
const draft=blankDraft();
// Mirrors + Juice before + Apple in App.tsx.
const counts=[...draft.counts]; counts[1]=(counts[1]||0)+1;
state.drafts['shop:0']={...draft,counts};
assert.doesNotThrow(()=>parseState(JSON.stringify(state)),
  'A basket created by normal controls must survive saving and reopening');
