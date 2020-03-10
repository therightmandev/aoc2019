data = readTextFile('input.txt')

var values = data.split(',').map(val => parseInt(val));
values[1] = 12;
values[2] = 2;
var mem;

function run(mem) {

	var i;

	for (i=0; i<mem.length; i++) {
		var ops = new Set();
		ops.add(1);
		ops.add(2);

		if (ops.has(mem[i])) {
			op1 = mem[mem[i+1]];
			op2 = mem[mem[i+2]];
			mem[mem[i+3]] = mem[i] == 1 ? op1 + op2 : op1 * op2;
			i = i+3;
		} else {
			break;
		}
	}

	return mem[0];
}

function set_mem(noun, verb) {
	mem = values.slice();
	mem[1] = noun;
	mem[2] = verb;
}

for (i=0; i<100; i++) {
	for (j=0; j<100; j++) {
		set_mem(i, j);
		if (run(mem) == 19690720) {
			write(100*i+j);
			break;
		}
	}
}
