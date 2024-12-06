import os.path

ALL_DIRECTIONS = (
    (1, 0),
    (-1, 0),
    (0, 1),
    (0, -1),
    (1, 1),
    (-1, -1),
    (1, -1),
    (-1, 1),
)

DIAGONALS = (
    (1, 1),
    (-1, -1),
    (1, -1),
    (-1, 1),
)


def parse(filename: str) -> list[str]:
    if not os.path.isabs(filename):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        filename = os.path.join(dir_path, filename)
    rows = []
    with open(filename) as f:
        for line in f:
            rows.append(line.strip())
    return rows


def found_word(
    rows: list[str], word: str, direction: tuple[int, int], row: int, col: int
) -> bool:
    """Can we find the word in the given direction starting at the given row and col?"""
    for letter in word:
        if row < 0 or row >= len(rows) or col < 0 or col >= len(rows[0]):
            return False
        if rows[row][col] != letter:
            return False
        row += direction[0]
        col += direction[1]
    return True


def part1() -> int:
    total = 0
    rows = parse("input-amos")
    for row in range(len(rows)):
        for col in range(len(rows[0])):
            for direction in ALL_DIRECTIONS:
                if found_word(rows, "XMAS", direction, row, col):
                    total += 1
    return total


def part2() -> int:
    total = 0
    # Keep track of the locations of the letter 'A' in the word 'MAS' - if we
    # have two different ocurrences of 'MAS' with the same location of 'A', we
    # have an cross.
    a_locs = set()
    rows = parse("input-amos")
    for row in range(len(rows)):
        for col in range(len(rows[0])):
            # Only look for X's not other types of intersections.
            for direction in DIAGONALS:
                if found_word(rows, "MAS", direction, row, col):
                    a_loc = (row + direction[0], col + direction[1])
                    if a_loc in a_locs:
                        total += 1
                    else:
                        a_locs.add(a_loc)
    return total


if __name__ == "__main__":
    print(part1())
    print(part2())
