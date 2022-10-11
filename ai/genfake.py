import random

def convert_to_preferred_format(sec):
    sec = sec % (24 * 3600)
    hour = sec // 3600
    sec %= 3600
    min = sec // 60
    sec %= 60
    return "%02d:%02d:%02d" % (hour, min, sec)

time = 0;

while time != 86400:
    print(convert_to_preferred_format(time), end=' ')
    print(random.randint(10, 150))
    time += 600;
