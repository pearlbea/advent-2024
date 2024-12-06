import fs from "fs";
import path from "path";

import { addResults, extractNumbers, getMatches, findEnabled } from "./day3";

const testData = fs.readFileSync(path.resolve("day3/test-input.txt"), "utf8");

describe("day3", () => {
  it("should find matches", () => {
    expect(getMatches(testData)).toEqual([
      "mul(2,4)",
      "mul(5,5)",
      "mul(11,8)",
      "mul(8,5)",
    ]);
  });

  it("should extract the numbers", () => {
    expect(extractNumbers("mul(2,4)")).toEqual(["2", "4"]);
  });

  it("should add the results", () => {
    expect(addResults(getMatches(testData))).toBe(161);
  });

  it("should remove substrings", () => {
    const string =
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    expect(findEnabled(string)).toBe("xmul(2,4)&mul[3,7]!^?mul(8,5))");
  });

  
});
