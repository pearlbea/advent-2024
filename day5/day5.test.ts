import fs from "fs";
import path from "path";

import {
  parseInput,
  isCorrectUpdate,
  findCorrectUpdates,
  findSumOfCenters,
  fixIncorrectUpdates
} from "./day5";

const data = fs.readFileSync(path.resolve("day5/test-input.txt"), "utf8");

describe("day5", () => {
  it("should parse the input", () => {
    const result = parseInput(data);
    expect(result).toEqual({
      rules: [
        "47|53",
        "97|13",
        "97|61",
        "97|47",
        "75|29",
        "61|13",
        "75|53",
        "29|13",
        "97|29",
        "53|29",
        "61|53",
        "97|53",
        "61|29",
        "47|13",
        "75|47",
        "97|75",
        "47|61",
        "75|61",
        "47|29",
        "75|13",
        "53|13",
      ],
      updates: [
        "75,47,61,53,29",
        "97,61,53,29,13",
        "75,29,13",
        "75,97,47,61,53",
        "61,13,29",
        "97,13,75,29,47",
      ],
    });
  });

  it("should return true if update is correct", () => {
    const { rules } = parseInput(data);

    const update = isCorrectUpdate("75,47,61,53,29", rules);
    expect(update).toBe(true);
    const update2 = isCorrectUpdate("97,61,53,29,13", rules);
    expect(update2).toBe(true);
    const update3 = isCorrectUpdate("75,29,13", rules);
    expect(update3).toBe(true);
    const update4 = isCorrectUpdate("75,97,47,61,53", rules);
    expect(update4).toBe(false);
    const update5 = isCorrectUpdate("97,13,75,29,47", rules);
    expect(update5).toBe(false);
  });

  it("should return a list of correct updates", () => {
    expect(findCorrectUpdates(data)[0]).toEqual([
      "75,47,61,53,29",
      "97,61,53,29,13",
      "75,29,13",
    ]);
  });

  it("should find sum of center numbers", () => {
    expect(findSumOfCenters(findCorrectUpdates(data)[0])).toBe(143);
  });

  it('should fix incorrect updates', () => {

    const fixed = fixIncorrectUpdates(findCorrectUpdates(data)[1]); 

  })
});
