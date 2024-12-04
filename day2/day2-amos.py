import os.path
from typing import Generator


def parse(filename: str) -> Generator[list[int]]:
    if not os.path.isabs(filename):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        filename = os.path.join(dir_path, filename)
    with open(filename) as f:
        for line in f:
            yield [int(num) for num in line.split()]


def is_safe(line: list[int]) -> bool:
    last = line[0]
    curr = line[1]
    if last == curr:
        return False
    if last < curr:
        valid_deltas = (1, 2, 3)
    else:
        valid_deltas = (-1, -2, -3)
    for num in line[1:]:
        if num - last not in valid_deltas:
            return False
        last = num
    return True


def partial_lines(line: list[int]) -> Generator[list[int]]:
    for i in range(len(line)):
        yield line[:i] + line[i + 1 :]


def part1() -> int:
    total = 0
    for line in parse("input-amos"):
        if is_safe(line):
            total += 1
    return total


def part2() -> int:
    total = 0
    for line in parse("input-amos"):
        if is_safe(line):
            total += 1
        elif any(is_safe(partial) for partial in partial_lines(line)):
            total += 1
    return total


if __name__ == "__main__":
    print(part1())
    print(part2())
