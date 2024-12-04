import fs from "fs";
import path from "path";

import {
  isDecreasing,
  isIncreasing,
  isSafeReport,
  parseFile,
  numberOfSafeReports,
  canBeSafe,
  removeItem,
} from "./day2";

const data = fs.readFileSync(path.resolve("day2/test-input.txt"), "utf8");

describe("day2", () => {
  it("should parse the file", () => {
    expect(parseFile(data)).toEqual([
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ]);
  });
  it("should check if increasing", () => {
    expect(isIncreasing([1, 3, 6, 7, 9])).toBeTruthy();
    expect(isIncreasing([1, 3, 2, 4, 5])).toBeFalsy();
  });
  it("should check if decreasing", () => {
    expect(isDecreasing([7, 6, 4, 2, 1])).toBeTruthy();
    expect(isDecreasing([1, 3, 6, 7, 9])).toBeFalsy();
    expect(isDecreasing([1, 3, 2, 4, 5])).toBeFalsy();
  });

  it("should return false if gap > 3", () => {
    const report = isSafeReport([1, 2, 7, 8, 9]);
    expect(report).toBe(false);
  });
  it("should return false if no gap", () => {
    const report = isSafeReport([1, 2, 2, 3, 4]);
    expect(report).toBe(false);
  });
  it("should return false if not increasing or decreasing", () => {
    const report = isSafeReport([1, 3, 2, 4, 5]);
    expect(report).toBe(false);
  });

  it("should return the number of safe reports", () => {
    const reports = parseFile(data);
    const safeReports = numberOfSafeReports(reports);
    expect(safeReports).toBe(2);
  });

  it("should return a new array with item removed", () => {
    expect(removeItem([8, 6, 4, 4, 1], 2)).toEqual([8, 6, 4, 1]);
    expect(removeItem([1, 2, 7, 8, 9], 3)).toEqual([1,2,7,9]);
  });

  it("should test saftey with one level removed", () => {
    expect(canBeSafe([8, 6, 4, 4, 1])).toBe(true);
    expect(canBeSafe([1, 2, 7, 8, 9])).toBe(false);
    expect(canBeSafe([9, 7, 6, 2, 1])).toBe(false);
  });
});
