from collections import defaultdict
from dataclasses import dataclass
import os.path


@dataclass(frozen=True)
class Rules:
    # Page -> set of pages that must come before it.
    before: dict[int, set[int]]


def parse(filename: str) -> tuple[Rules, list[list[int]]]:
    rules = Rules(defaultdict(set))
    if not os.path.isabs(filename):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        filename = os.path.join(dir_path, filename)
    with open(filename) as f:
        for line in f:
            if line.strip() == "":
                break
            before, after = (int(page) for page in line.strip().split("|"))
            rules.before[after].add(before)
        page_lists = []
        for line in f:
            page_lists.append([int(x) for x in line.strip().split(",")])
    return rules, page_lists


def is_page_ok(rules: Rules, page: int, after: set[int]) -> bool:
    if after.intersection(rules.before[page]):
        return False
    return True


def are_pages_ok(rules: Rules, pages: list[int]) -> bool:
    for i in range(len(pages)):
        page = pages[i]
        after = set(pages[i + 1 :])
        if not is_page_ok(rules, page, after):
            return False
    return True


def order_pages(rules: Rules, pages: list[int]) -> list[int]:
    # Try swapping adjacent pages (like bubblesort) until we find a valid order.
    # Not sure if this is guaranteed to work, but it seems to work for the
    # input.
    order = pages.copy()
    while not are_pages_ok(rules, order):
        for i in range(len(order) - 1):
            if order[i + 1] in rules.before[order[i]]:
                order[i], order[i + 1] = order[i + 1], order[i]
    return order


def part1() -> int:
    total = 0
    rules, page_lists = parse("input-amos")
    for pages in page_lists:
        if are_pages_ok(rules, pages):
            total += pages[len(pages) // 2]
    return total


def part2() -> int:
    total = 0
    rules, page_lists = parse("input-amos")
    for pages in page_lists:
        if not are_pages_ok(rules, pages):
            order = order_pages(rules, pages)
            total += order[len(order) // 2]
    return total


if __name__ == "__main__":
    print(part1())
    print(part2())
