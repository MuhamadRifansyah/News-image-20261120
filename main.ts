// news-image-20261120 entry (Node 22, standard library only): the poster is the
// entry.png beside this file, and this program copies it to /output/entry.png,
// where the gate and the judge read it. The image sums up the world news of
// Friday 20 November 2026 in one constructivist poster. Nothing is drawn at
// run time and there is no network, so both runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const SOURCE = new URL('./entry.png', import.meta.url);

// Fail loudly instead of shipping a missing or truncated image: the gate
// refuses an entry whose file is not a whole PNG, so a bad copy must crash
// here rather than pass silently.
const expected = statSync(SOURCE).size;

mkdirSync(OUTPUT_DIR, { recursive: true });
const dest = join(OUTPUT_DIR, 'entry.png');
copyFileSync(SOURCE, dest);
const actual = statSync(dest).size;
if (actual !== expected) {
  throw new Error(`entry.png copy incomplete: ${actual} of ${expected} bytes`);
}
