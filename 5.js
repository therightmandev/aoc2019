data = readTextFile('input.txt')

var values = data.split(',');
var mem;



function run(mem) {
	function get_param_modes(modes, n) {
		var i;
		var m = '';
		for (i=0; i<n-modes.length; i++) m += '0';
		m += modes;

		return m;
	}

	var ops = {
		1: 3,
		2: 3,
		3: 1,
		4: 1,
		5: 2,
		6: 2,
		7: 3,
		8: 3
	}

	var i = 0;

	function get_op(mode, input) {
		return mode === '0' ? parseInt(mem[parseInt(mem[input])]) : parseInt(mem[input])
	}

	while (true) {

		console.log('inst')
		op_str = mem[i];
		opcode = parseInt(op_str.slice(-2));
		param_modes = get_param_modes(op_str.slice(0, -2), ops[opcode]);
		if (ops[opcode] === 3) {
			op1 = get_op(param_modes.slice(-1), i+1)
			op2 = get_op(param_modes.slice(-2, -1), i+2)
			result_addr = parseInt(mem[i+3]);
			if (opcode === 1 || opcode === 2) {
				mem[result_addr] = opcode == 1 ? (op1 + op2).toString() : (op1 * op2).toString();
				console.log('three')
			} else if (opcode === 7) {
				mem[result_addr] = op1 < op2 ? 1 : 0;
			} else if (opcode === 8) {
				mem[result_addr] = op1 === op2 ? 1 : 0;
			}
			i += 4;
		} else if (ops[opcode] === 1) {
			console.log('two')
			//op = input
			if (opcode === 3) {
				mem[parseInt(mem[i+1])] = prompt('Input');
			} else {
				//output value
				var output = get_op(param_modes.slice(-1), i+1);
				mem[0] = output;
				console.log('ouput:', output);
			}
			i += 2;
		} else if (ops[opcode] === 2) {
			op1 = get_op(param_modes.slice(-1), i+1);
			if (opcode === 5) {
				if (op1 !== 0) i = get_op(param_modes.slice(-2, -1), i+2);
				else i += 3;
			} else if (opcode === 6) {
				if (op1 === 0) i = get_op(param_modes.slice(-2, -1), i+2);
				else i += 3;
			}
		} else {
			console.log('hia', opcode, i)
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


mem = values.slice();
console.log(run(mem));

/*for (i=0; i<100; i++) {
	for (j=0; j<100; j++) {
		set_mem(i, j);
		if (run(mem) == 19690720) {
			write(100*i+j);
			break;
		}
	}
}*/
