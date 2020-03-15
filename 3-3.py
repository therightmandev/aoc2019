from utils import get_input

# solution #3: save the points in a hasmap where the keys are the distance from the center and the values are arrays with the points in that distance

data = get_input().split('\n')[:-1]

incs = {
        'U': (0, 1),
        'D': (0, -1),
        'L': (-1, 0),
        'R': (1, 0)
    }

# build lines
lines = [{}, {}]

for i in (0, 1):
    curr = (0, 0)
    for instruction in data[i].split(','):
        direction = instruction[0]
        steps = int(instruction[1:])
        inc = incs[direction]
        for _ in range(steps):
            new_pos = (curr[0] + inc[0], curr[1] + inc[1])
            curr = new_pos
            curr_dist = abs(curr[0]) + abs(curr[1])
            if curr_dist in lines[i]: lines[i][curr_dist].append(curr)
            else: lines[i][curr_dist] = [curr]

print('built lines')

print(lines[0][10000], lines[1][10000])
print(len(lines[0]), len(lines[1]))

#check by distance if there is an intersection

i = 0

dist = None
while i < 100000:
    i += 1
    if dist is None:
        for p in lines[0][i]:
            if p in lines[1][i]:
                dist = i
    else: break

print('distance:', dist)
