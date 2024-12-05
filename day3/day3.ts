import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.resolve("day3/input.txt"), "utf8");
const REGEX = /(mul\((\d{1,3},\d{1,3})\))/g;

export function getMatches(input: string): string[] {
  return input.match(REGEX);
}

export function extractNumbers(item: string) {
  return item.match(/(\d{1,3})/g);
}

export function addResults(arr: string[]) {
  let total = 0;
  for (const item of arr) {
    const numbers = extractNumbers(item);
    const product = Number(numbers[0]) * Number(numbers[1]);
    total += product;
  }
  return total;
}

console.log(addResults(getMatches(data)));

// find enabled instructions
export function findEnabled(input: string) {
  return input.replace(/(don\'t\(\)).*(do\(\))/gs, "");
}

console.log(addResults(getMatches(findEnabled(data))));
