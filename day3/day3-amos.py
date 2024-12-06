import dataclasses
import os.path
import re
from typing import Generator

# Part 1
# ------

MUL_PAT = re.compile(r"mul\((\d+),(\d+)\)")


def parse(filename: str) -> Generator[str]:
    if not os.path.isabs(filename):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        filename = os.path.join(dir_path, filename)
    with open(filename) as f:
        for line in f:
            yield line.strip()


def muls(line: str) -> Generator[tuple[int, int]]:
    for match in MUL_PAT.finditer(line):
        yield (int(match.group(1)), int(match.group(2)))


def part1() -> int:
    total = 0
    for line in parse("input-amos"):
        for x, y in muls(line):
            total += x * y
    return total


# Part 2
# ------

OP_PAT = re.compile(r"do\(\)|don't\(\)|mul\((\d+),(\d+)\)")


@dataclasses.dataclass(frozen=True)
class Op:
    name: str
    x: int = 0
    y: int = 0


def ops(line: str) -> Generator[Op]:
    for match in OP_PAT.finditer(line):
        if match.group(0) == "do()":
            yield Op("do")
        elif match.group(0) == "don't()":
            yield Op("don't")
        else:
            yield Op("mul", int(match.group(1)), int(match.group(2)))


def part2() -> int:
    total = 0
    do = True
    for line in parse("input-amos"):
        for op in ops(line):
            if op.name == "do":
                do = True
            elif op.name == "don't":
                do = False
            elif op.name == "mul" and do:
                total += op.x * op.y
    return total


if __name__ == "__main__":
    print(part1())
    print(part2())
