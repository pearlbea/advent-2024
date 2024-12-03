from collections import Counter


def parse(filename: str) -> tuple[list[int], list[int]]:
    l1 = []
    l2 = []
    with open(filename) as f:
        for line in f:
            num1, num2 = line.split()
            l1.append(int(num1))
            l2.append(int(num2))
    return l1, l2


def part1() -> int:
    l1, l2 = parse("input-amos")
    l1.sort()
    l2.sort()
    return sum(abs(i1 - i2) for (i1, i2) in zip(l1, l2))


def part2() -> int:
    l1, l2 = parse("input-amos")
    freq = Counter(l2)
    return sum(i * freq[i] for i in l1)


if __name__ == "__main__":
    print(part1())
    print(part2())
