import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.resolve("day1/input.txt"), "utf8");

export function parseFile(data: string): number[][] {
  const left = [];
  const right = [];
  const lines = data.split(/\n/);

  for (const line of lines) {
    const row = line.split("   ");
    left.push(Number(row[0]));
    right.push(Number(row[1]));
  }
  return [left, right];
}

function sortColumn(col: number[]) {
  return col.sort((a, b) => {
    return a - b;
  });
}

export function sortColumns(parsedData: number[][]) {
  const [left, right] = parsedData;
  const sortedLeft = sortColumn(left);
  const sortedRight = sortColumn(right);
  return [sortedLeft, sortedRight];
}

export function getDistances(sortedData: number[][]) {
  let distances = 0;
  const [sortedLeft, sortedRight] = sortedData;
  for (let i = 0; i < sortedLeft.length; i++) {
    const diff = Math.abs(sortedLeft[i] - sortedRight[i]);
    distances += diff;
  }
  return distances;
}

console.log(getDistances(sortColumns(parseFile(data)))); // 1722302

export function calculateSimilariltyScore(sortedData: number[][]) {
  let similarityScore = 0;
  const [left, right] = sortedData;

  for (let i = 0; i < left.length; i++) {
    const num = left[i];

    const appearsInRight = right.filter((item) => {
      return item === num;
    });

    const increase = num * appearsInRight.length;

    similarityScore += increase;
  }
  return similarityScore;
}

console.log(calculateSimilariltyScore(sortColumns(parseFile(data)))); // 20373490
