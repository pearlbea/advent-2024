import os.path

type point = tuple[int, int]
type dir = tuple[int, int]


def parse(filename: str) -> tuple[set[point], point, int, int]:
    # Returns set of wall positions, the guard position, and width, and height
    # of map. Assume that the guard is always facing up.
    if not os.path.isabs(filename):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        filename = os.path.join(dir_path, filename)
    walls = set()
    with open(filename) as f:
        for row, line in enumerate(f):
            for col, char in enumerate(line.strip()):
                if char == "#":
                    walls.add((col, row))
                elif char == "^":
                    guard_pos = (col, row)
    return walls, guard_pos, col + 1, row + 1


def is_out_of_bounds(pos: point, w: int, h: int) -> bool:
    return pos[0] < 0 or pos[1] < 0 or pos[0] >= w or pos[1] >= h


def move(walls: set[point], pos: point, direction: dir) -> tuple[point, dir]:
    # Returns the new position and direction of the guard after moving.
    # Try to move forward.
    new_pos = (pos[0] + direction[0], pos[1] + direction[1])
    if new_pos in walls:
        # Turn right - note that we don't actually move into the wall in this
        # case.
        return pos, (-direction[1], direction[0])
    return new_pos, direction


def part1() -> int:
    walls, guard_pos, w, h = parse("input-amos")
    guard_direction: dir = (0, -1)  # Assume guard is facing up
    guard_positions = {guard_pos}
    while not is_out_of_bounds(guard_pos, w, h):
        guard_pos, guard_direction = move(walls, guard_pos, guard_direction)
        guard_positions.add(guard_pos)
    return len(guard_positions) - 1  # Exclude the guard's starting position


def is_loop(
    walls: set[point], guard_pos: point, guard_direction: dir, w: int, h: int
) -> bool:
    guard_position_directions = {(guard_pos, guard_direction)}
    while not is_out_of_bounds(guard_pos, w, h):
        guard_pos, guard_direction = move(walls, guard_pos, guard_direction)
        if (guard_pos, guard_direction) in guard_position_directions:
            # We've been in this position and direction before so it must be a
            # loop.
            return True
        guard_position_directions.add((guard_pos, guard_direction))
    return False


def unobstructed_guard_path(
    walls: set[point], guard_pos: point, guard_direction: dir, w: int, h: int
) -> set[point]:
    # We want this path since it only makes sense to place obstacles on the path
    # that the guard would take.
    guard_positions = set()
    while not is_out_of_bounds(guard_pos, w, h):
        guard_pos, guard_direction = move(walls, guard_pos, guard_direction)
        guard_positions.add(guard_pos)
    return guard_positions


def part2() -> int:
    num_loops = 0
    walls, guard_pos, w, h = parse("input-amos")
    guard_direction: dir = (0, -1)  # Assume guard is facing up
    path = unobstructed_guard_path(walls, guard_pos, guard_direction, w, h)
    for col, row in path:
        obstacle = (col, row)
        walls.add(obstacle)
        if is_loop(walls, guard_pos, guard_direction, w, h):
            num_loops += 1
        walls.discard(obstacle)
    return num_loops


if __name__ == "__main__":
    print(part1())
    print(part2())
