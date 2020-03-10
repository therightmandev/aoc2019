data = readTextFile('http://localhost:8000/input.txt');
values = data.split('\n').map(val => parseInt(val));

console.log(values);

var sum = 0;
//values.forEach(mass => sum += Math.floor(mass/3) - 2);

values.forEach(function(val) {
    fuel = val;
    do {
        fuel = Math.floor(fuel/3) - 2;
        if (fuel > 0) sum += fuel;
    }
    while(fuel > 0)
})

console.log(sum);