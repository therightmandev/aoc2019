data = readTextFile('input.txt')

var values = data.split(',');
var mem;


class Program{
	constructor(mem) {
		this.mem = mem;
		this.input = undefined;
		this.halted = false;
		this.i = 0; //program counter
	}

	set_input(input) {
		this.input = input;
	}

	run() {
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


		function get_op(mode, input, mem) {
			return mode === '0' ? parseInt(mem[parseInt(mem[input])]) : parseInt(mem[input])
		}

		var i = this.i;

		var op_str, opcode, param_modes, op1, op2, result_addr;

		while (true) {

			this.i = i;
			op_str = this.mem[i];
			opcode = parseInt(op_str.slice(-2));
			param_modes = get_param_modes(op_str.slice(0, -2), ops[opcode]);
			if (ops[opcode] === 3) {
				op1 = get_op(param_modes.slice(-1), i+1, this.mem)
				op2 = get_op(param_modes.slice(-2, -1), i+2, this.mem)
				result_addr = parseInt(this.mem[i+3]);
				if (opcode === 1 || opcode === 2) {
					this.mem[result_addr] = opcode == 1 ? (op1 + op2).toString() : (op1 * op2).toString();
				} else if (opcode === 7) {
					this.mem[result_addr] = op1 < op2 ? 1 : 0;
				} else if (opcode === 8) {
					this.mem[result_addr] = op1 === op2 ? 1 : 0;
				}
				i += 4;
			} else if (ops[opcode] === 1) {
				if (opcode === 3) {
					if (this.input === undefined) {
						this.i = i;
						return;
					}
					this.mem[parseInt(this.mem[i+1])] = this.input;

					this.input = undefined;
					/*if (input === undefined && input2 === undefined) {
						this.mem[parseInt(this.mem[i+1])] = prompt('Input');
					} else if (input === undefined) {
						this.mem[parseInt(this.mem[i+1])] = input2;
						input2 = undefined;
					}
					else {
						this.mem[parseInt(this.mem[i+1])] = input;
						input = undefined;
					}*/
				} else {
					//output value
					var output = get_op(param_modes.slice(-1), i+1, this.mem);
					this.mem[0] = output;
					//console.log('output:', output);
				}
				i += 2;
			} else if (ops[opcode] === 2) {
				op1 = get_op(param_modes.slice(-1), i+1, this.mem);
				if (opcode === 5) {
					if (op1 !== 0) i = get_op(param_modes.slice(-2, -1), i+2, this.mem);
					else i += 3;
				} else if (opcode === 6) {
					if (op1 === 0) i = get_op(param_modes.slice(-2, -1), i+2, this.mem);
					else i += 3;
				}
			} else {
				//console.log('END, opcode', opcode, 'instruction', i)
				this.halted = true;
				this.i = i;
				return;
			}
		}

	}
}

function set_mem(noun, verb) {
	mem = values.slice();
	mem[1] = noun;
	mem[2] = verb;
}

//the output of each amplifier is the input of the next, the first one is 0
var output;
var phase;
var max_thrust = 0;
//phases available (pa)
var pa = [5, 6, 7, 8, 9];
for (var j = 0; j < 5; j++)
	for (var k = 0; k < 4; k++)
		for (var l = 0; l < 3; l++)
			for (var m = 0; m < 2; m++)
				for (var n = 0; n < 1; n++) {
					var pa = [5, 6, 7, 8, 9];
					var amplifiers = [
						new Program(values.slice()),
						new Program(values.slice()),
						new Program(values.slice()),
						new Program(values.slice()),
						new Program(values.slice())
					]
					var phases = [
						pa.splice(j, 1)[0],
						pa.splice(k, 1)[0],
						pa.splice(l, 1)[0],
						pa.splice(m, 1)[0],
						pa.splice(n, 1)[0]
					];
					output = 0;
					for (var i = 0; i < 5; i++) {
						amplifier = amplifiers[i]
						phase = phases[i];
						amplifier.set_input(phase);
						amplifier.run();
						amplifier.set_input(output);
						amplifier.run();
						output = amplifier.mem[0];
					}
					//comment this while loop for testing at first
					var i = 0;
					while (!amplifiers[4].halted) {
						amplifier = amplifiers[i];
						amplifier.set_input(output);
						amplifier.run();
						output = amplifier.mem[0];
						i = i > 3 ? 0 : i + 1; // loop i through [0 - 4]
					}
					if (output > max_thrust) max_thrust = output;
				}


console.log('max_thrust', max_thrust);

/*p = new Program(values.slice());
p.set_input(-7);
p.run();
console.log('out', p.mem[0]);*/
