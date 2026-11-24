// The Dog Ate My Homework: Funniest Excuse — entry program.
// Writes one dog's excuse to /output/entry.txt. Deterministic:
// no clock, no randomness, no network — the same bytes every run.
//
// The line was picked by drafting candidates and scoring each against
// the judge's brief, most important criterion first:
//   1. a dog's own-voice excuse after being caught eating the homework
//   2. the biggest laugh, with a twist or a piece of dog logic in one line
//   3. sounds like a real dog, with a dog's priorities, no human shame
//   4. stands alone, no setup, nothing needing a second line
//   5. fresh — no cat, no taste of paper, no "good boy"
// The winner reframes eating as submitting: the homework was due, so the
// dog turned it in early — inside itself. It believes it did nothing
// wrong, and the punchline lands on the last two words.
// Runners-up, beaten on the twist: "It said 'due today.' I handled it.
// It's due nowhere now." / "I ate it to protect your grades — a teacher
// can't mark wrong what doesn't exist." / "The homework was on the floor.
// The floor is my plate. I never leave food on my plate."
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "It was due today, so I turned it in early — inside me.";

// The gate only lets through a single line of 1 to 200 characters that
// is not blank, so refuse to write anything that would fail it.
function gate(line: string): void {
  if (line.includes("\n") || line.trim().length === 0 || line.length > 200) {
    throw new Error("entry line fails the gate: must be one line of 1-200 chars");
  }
}

gate(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

// Read the file back: a short or corrupted write must never pass
// silently, so fail loudly unless the bytes on disk are the line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE + "\n") {
  throw new Error("written entry does not match the intended line");
}
