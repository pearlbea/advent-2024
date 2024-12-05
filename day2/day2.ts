import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.resolve("day2/input.txt"), "utf8");

export function parseFile(data: string) {
  const reports = data.split(/\n/).map((report) => {
    return report.split(" ").map((item) => {
      return parseInt(item, 10);
    });
  });
  return reports;
}

export function isIncreasing(array: number[]) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] >= array[i + 1]) {
      return false;
    }
  }
  return true;
}

export function isDecreasing(array: number[]) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] <= array[i + 1]) {
      return false;
    }
  }
  return true;
}

export function isSafeReport(report: number[]): boolean {
  for (let i = 0; i < report.length - 1; i++) {
    const first = report[i];
    const next = report[i + 1];
    if (first === next) return false;
    if (Math.abs(first - next) > 3) return false;
  }

  if (!isDecreasing(report) && !isIncreasing(report)) {
    return false;
  }
  return true;
}

export function numberOfSafeReports(reports: number[][]) {
  let safeReports = 0;
  for (let i = 0; i < reports.length; i++) {
    const isSafe = isSafeReport(reports[i]);
    if (isSafe) {
      safeReports++;
    } else if (canBeSafe(reports[i])) {
      // added for part 2
      safeReports++;
    }
  }
  return safeReports;
}

console.log(numberOfSafeReports(parseFile(data))); // 356 part 1, 413 (too small) for part 2

export function removeItem(arr: number[], index: number) {
  const copy = [...arr];
  copy.splice(index, 1);
  return copy;
}

export function canBeSafe(report: number[]) {
  for (let i = 0; i < report.length; i++) {
    const copy = removeItem(report, i);
    if (isSafeReport(copy)) {
      return true;
    }
  }
  return false;
}
