from utils import get_input

# for the second part of the problem
# save each line as an array
# have intersections in dict with number of steps for each intersection

incs = {
        'U': (0, 1),
        'D': (0, -1),
        'L': (-1, 0),
        'R': (1, 0)
    }

def build_lines_arr(data):


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
    
    return lines

def build_lines_dict(data):
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

    return lines

if __name__ == '__main__':
    data = get_input().split('\n')[:-1]
    lines = build_lines_arr(data)
    lines_dict = build_lines_dict(data)
    print('built lines arr', len(lines[0]), len(lines[1]))
    print('built lines dict', len(lines_dict[0]), len(lines_dict[1]))
    
    # find intersections
    intersections = []
    i = 0
    dist = None
    while i < 1000000:
        i += 1
        if dist is None:
            if i in lines_dict[0] and i in lines_dict[1]:
                for p in lines_dict[0][i]:
                    if p in lines_dict[1][i]:
                        intersections.append({'coords': p, 'dist': None})
        else: break
    print('interserctions', intersections)

    # calculate sum of distances for each intersection -- optimization: if dist of one of them is greater than the smallest sum so far, stop there
    min_dist = None
    for intersection in intersections:
        dist = 0
        for point in lines[0]:
            dist += 1
            if point == intersection['coords']:
                break
        for point in lines[1]:
            dist += 1
            if point == intersection['coords']:
                if min_dist is None or min_dist > dist: min_dist = dist
                intersection['dist'] = dist
                break

    print('interserctions', intersections)
    print('min_dist', min_dist)

