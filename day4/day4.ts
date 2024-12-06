import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.resolve("day4/input.txt"), "utf8");

export function findWords(data): number {
  const lines = data.split(/\n/);
  const words = [];

  // horizontal
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length - 3; j++) {
      let word = line[j] + line[j + 1] + line[j + 2] + line[j + 3];
      if (word === "XMAS" || word === "SAMX") {
        words.push(word);
      }
    }
  }

  // veritcal
  for (let i = 0; i < lines.length - 3; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      let word =
        lines[i][j] + lines[i + 1][j] + lines[i + 2][j] + lines[i + 3][j];
      if (word === "XMAS" || word === "SAMX") {
        words.push(word);
      }
    }
  }

  // diagonal
  for (let i = 0; i < lines.length - 3; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (
        lines[i][j] &&
        lines[i + 1][j + 1] &&
        lines[i + 2][j + 2] &&
        lines[i + 3][j + 3]
      ) {
        const word =
          lines[i][j] +
          lines[i + 1][j + 1] +
          lines[i + 2][j + 2] +
          lines[i + 3][j + 3];
        if (word === "XMAS" || word === "SAMX") {
          words.push(word);
        }
      }
    }

    for (let j = lines[i].length - 1; j >= 0 && j < lines[i].length; j--) {
      if (
        lines[i][j] &&
        lines[i + 1][j - 1] &&
        lines[i + 2][j - 2] &&
        lines[i + 3][j - 3]
      ) {
        const word =
          lines[i][j] +
          lines[i + 1][j - 1] +
          lines[i + 2][j - 2] +
          lines[i + 3][j - 3];

        if (word === "XMAS" || word === "SAMX") {
          words.push(word);
        }
      }
    }
  }

  return words.length;
}

// console.log(findWords(data));

// part 2

export function patternCount(data) {
  const lines = data.split(/\n/);
  let patterns = 0;

  for (let i = 0; i < lines.length - 2; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (
        lines[i][j] &&
        lines[i + 1][j + 1] &&
        lines[i + 2][j + 2] &&
        lines[i][j + 2] &&
        lines[i + 1][j + 1] &&
        lines[i + 2][j]
      ) {
        const firstWord =
          lines[i][j] + lines[i + 1][j + 1] + lines[i + 2][j + 2];

        const secondWord =
          lines[i][j + 2] + lines[i + 1][j + 1] + lines[i + 2][j];

        if (
          (firstWord === "SAM" || firstWord === "MAS") &&
          (secondWord === "SAM" || secondWord === "MAS")
        ) {
          patterns++;
        }
      }
    }
  }
  return patterns;
}

console.log(patternCount(data));
