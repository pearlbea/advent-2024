import fs from "fs";
import path from "path";

import {
  calculateSimilariltyScore,
  getDistances,
  parseFile,
  sortColumns,
} from "./day1";

const testData = fs.readFileSync(path.resolve("day1/test-input.txt"), "utf8");

describe("day1", () => {
  it("should parse the file", () => {
    const output = parseFile(testData);
    expect(output).toEqual([
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ]);
  });

  it("should sort the columns", () => {
    const sorted = sortColumns([
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ]);
    expect(sorted).toEqual([
      [1, 2, 3, 3, 3, 4],
      [3, 3, 3, 4, 5, 9],
    ]);
  });

  it("should get total distance", () => {
    const totalDistance = getDistances([
      [1, 2, 3, 3, 3, 4],
      [3, 3, 3, 4, 5, 9],
    ]);
    console.log(totalDistance);
    expect(totalDistance).toBe(11);
  });

  it("should calculate similarity score", () => {
    const score = calculateSimilariltyScore([
      [1, 2, 3, 3, 3, 4],
      [3, 3, 3, 4, 5, 9],
    ]);
    expect(score).toBe(31);
  });
});
