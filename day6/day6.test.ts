import fs from "fs";
import path from "path";

import { getStartingPosition, parseInput, solveMaze } from "./day6";

const data = fs.readFileSync(path.resolve("day6/test-input.txt"), "utf8");

describe("Day6", () => {
  it("should return a list of visited positions", () => {
    const maze = parseInput(data);
    const start = getStartingPosition(maze);
    const count = solveMaze(maze, start);
    expect(count).toBe(41);
  });
});
