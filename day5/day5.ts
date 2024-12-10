import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.resolve("day5/input.txt"), "utf8");

export function parseInput(input) {
  const lines = input.split(/\n/);
  const rules = [];
  const updates = [];

  for (const line of lines) {
    if (line.includes("|")) {
      rules.push(line);
    } else if (line.includes(",")) {
      updates.push(line);
    }
  }
  return { rules, updates };
}

export function createMap(update) {
  const items = update.split(",");
  const map = new Map();
  for (let i = 0; i < items.length; i++) {
    map.set(items[i], i);
  }
  return map;
}

export function isCorrectUpdate(update, rules): boolean {
  const orderMap = createMap(update);

  const score = [];

  for (const rule of rules) {
    const nums = rule.split("|");
    const first = orderMap.get(nums[0]);
    const last = orderMap.get(nums[1]);

    if (typeof first !== "number" || typeof last !== "number") {
      score.push("undefined");
    }

    if (typeof first === "number" && typeof last === "number") {
      if (first < last) {
        score.push(true);
      } else {
        score.push(false);
      }
    }
  }

  if (!score.includes(false)) {
    return true;
  }

  return false;
}

export function findCorrectUpdates(input) {
  const { rules, updates } = parseInput(input);
  const correctUpdates = [];
  const incorrectUpdates = [];

  for (const update of updates) {
    if (isCorrectUpdate(update, rules)) {
      correctUpdates.push(update);
    } else {
        incorrectUpdates.push(update);
    }
  }
  return [correctUpdates, incorrectUpdates];
}

// console.log(findCorrectUpdates(data));

export function findSumOfCenters(correctUpdates) {
  const centers = [];
  // assuming they are all odd

  for (const update of correctUpdates) {
    const updateArray = update.split(",");
    const middleIndex = Math.floor(updateArray.length / 2);
    centers.push(updateArray[middleIndex]);
  }
  return centers.reduce((acc, current) => {
    return Number(acc) + Number(current);
  });
}

// console.log(findSumOfCenters(findCorrectUpdates(data)[0]));

/// part two

