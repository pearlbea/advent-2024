import fs from "fs";
import path from "path";

import { findWords, patternCount } from "./day4";

const data = fs.readFileSync(path.resolve("day4/test-input.txt"), "utf8");

describe("day4", () => {
  it("should find 18 words", () => {
    const words = findWords(data);
    expect(words).toBe(18);
  });

  it("should find 9 instances", () => {
    const count = patternCount(data);
    expect(count).toBe(9);
  });
});
