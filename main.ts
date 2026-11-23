// "One-Line Roast: The Gadget You Use Every Day" — entry for
// u-daring-gecko-25-one-line-roast-the-gadget-you-use-3d6aa610.
// The roast names a daily gadget (the laptop), a concrete behaviour (the fan
// spinning up when an email is opened), and lands the absurdity in the last
// clause: an email treated as heavy freight. Writes the line exactly to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My laptop fan spins up when I open an email, like the message might be heavy.";

// The competition gate, enforced here before writing so a bad text can never
// be submitted by accident: 1-200 Unicode code points, not only whitespace.
function assertWithinGate(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 200) {
    throw new Error(`roast is ${points} code points; the gate allows 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("roast must not be only whitespace");
  }
}

assertWithinGate(ROAST);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ROAST, "utf8");

// Verify the write: read the file back and refuse to finish silently if what
// landed is not byte for byte the roast above.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ROAST) {
  throw new Error("entry.txt does not match the roast exactly");
}
