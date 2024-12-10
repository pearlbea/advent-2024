import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.resolve("day6/day6-input.txt"), "utf8");

export function parseInput(input) {
  let lines = input.split(/\n/);
  const table = [];
  for (let line of lines) {
    table.push([...line]);
  }
  return table;
}

export function getStartingPosition(table: string[][]) {
  let startingIndex = { value: "^", row: 0, col: 0 };
  let index = 0;
  for (let row of table) {
    if (row.indexOf("^") !== -1) {
      startingIndex = { value: "^", row: index, col: row.indexOf("^") };
    }
    index++;
  }
  return startingIndex;
}

// depth-first search

export function dfs(
  maze: string[][],
  position: {
    value: string;
    row: number;
    col: number;
  },
  visited
) {
  const { col, row, value } = position;

  if (
    row < 0 ||
    row >= maze.length ||
    col < 0 ||
    col >= maze[0].length ||
    visited.includes(`${row}${col}`) ||
    value === "#"
  ) {
    return;
  }

  visited.push(`${row}${col}`);

  const nextStep = {
    "^": dfs(maze, { row: row - 1, col, value }, visited),
    ">": dfs(maze, { row, col: col + 1, value }, visited),
    v: dfs(maze, { row: row + 1, col, value }, visited),
    "<": dfs(maze, { row, col: col - 1, value }, visited),
  };

  nextStep[value];
}

export function solveMaze(maze, startingPosition) {
  const visited = [];
  dfs(maze, startingPosition, visited);
  return visited.length;
}
