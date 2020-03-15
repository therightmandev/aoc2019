from utils import get_input

# solution #1: save points of lines to array and compare the distances of the intersections -- worked, took long time
#
# solution #2: represent the grid with an array, in each point record if each of the lines is there (with a length-2 array in each point)
# and check starting in the center and going by bigger and bigger circles around the center for intersections -- didn't work probably due to error, but solution 3 in file 3-3.py was better and worked so I didn't bother fixing

data = get_input().split('\n')[:-1]

incs = {
        'U': (0, 1),
        'D': (0, -1),
        'L': (-1, 0),
        'R': (1, 0)
    }

# build lines
lines = [[], []]
for i in (0, 1):
    curr = (0, 0)
    for instruction in data[i].split(','):
        direction = instruction[0]
        steps = int(instruction[1:])
        inc = incs[direction]
        for _ in range(steps):
            new_pos = (curr[0] + inc[0], curr[1] + inc[1])
            curr = new_pos
            lines[i].append(curr)

print('built lines')

# check in circles
i = 2

# make coordinate combinations
#
# starting radius = 1
# combinations: (1, 0) (0, 1) (-1, 0) (0, -1)
#
# next radius = 2
# combinations: (1, 1) (1, -1) (-1, 1) (-1, -1) (2, 0) (0, 2) (-2, 0) (0, -2)
# etc.

def get_pairs(a, b):
    arr = [(a, b), (b, a), (-a, b), (b, -a), (a, -b), (-b, a), (-a, -b), (-b, -a)]
    ret = set()
    for c in arr: ret.add(c)
    return ret

def get_radius_coords(radius):
    coords = set()
    for i in range(radius):
        for p in get_pairs(radius - i, i):
            coords.add(p)
    return coords

i = 1
dist = None
while i < 100000:
    print(i)
    coords = get_radius_coords(i)
    for c in coords:
        if c in lines[0] and c in lines[1]:
            dist = abs(c[0]) + abs(c[1])
            break

    i += 1

print('distance:', dist)

'''
# this is solution 1
# find intersections
intersections = []
for point in lines[0]:
    if point in lines[1]:
        print(point)
        intersections.append(point)

print('calculated intersections')

# calculate manhattan dist from each intersection to the center and pick the lowest one

low = None
for intersection in intersections:
    dist = abs(intersection[0]) + abs(intersection[1])
    if low is None or dist < low:
        low = dist

print(low)'''
