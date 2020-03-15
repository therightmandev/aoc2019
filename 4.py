MIN = 254032
MAX = 789860


count = 0
for i in range(MIN, MAX):
    # check if double criteria (two consecutive digits are the same)
    # check if it never decreases
    double = False
    double_digit = 0
    decreased = False
    last_digit = 0
    for digit in map(int, str(i)):
        if digit < last_digit:
            decreased = True
            break
        elif digit == last_digit:
            if not double and double_digit != digit:
                double = True
                double_digit = digit
            elif double_digit == digit:
                double = False
        last_digit = digit

    if double and not decreased:
        count += 1

print('count', count)

