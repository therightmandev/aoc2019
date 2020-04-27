var data = readTextFile('input.txt');

var values = data.split('\n');
var r = {};

values.forEach(function(value) {
	s = value.split(')');
	planet = s[0].replace(/[\x00-\x1F\x7F-\x9F]/g, "");
	moon = s[1].replace(/[\x00-\x1F\x7F-\x9F]/g, "");

	if (r[planet] !== undefined) {
		r[planet].push(moon);
	} else {
		r[planet] = [moon];
	}
})

/*var direct_counts = {}

for (var planet in r) {
	var directs = 0;
	moons = r[planet]
	moons.forEach(function() {
		directs += 1;
	})
	direct_counts[planet] = directs
	console.log(planet)
	console.log(directs)
}*/

var orbits = 0;

function rec(moons, start) {
	if (moons === undefined)
		return start;
	count = start;
	moons.forEach(function(moon){
		//console.log(moon)
		count += rec(r[moon], start + 1);
	})
	return count;
}

//console.log(r)
//console.log(rec(r['COM'], 0))

curr = 'COM';
path = [];
path.push(curr);

function rec2(path, curr, goal) {
	if (r[curr] === undefined) {
		return;
	}
	for (var i in r[curr]){
		moon = r[curr][i];
		var p = path.slice();
		if (moon === goal) {
			return p;
		}
		p.push(moon);
		ret = rec2(p, moon, goal);
		if (ret !== undefined) {
			return ret;
		}
	}
}

you_path = rec2(path, curr, 'YOU');
san_path = rec2(path, curr, 'SAN');

console.log(you_path);
console.log(san_path);

long_path = you_path.length > san_path.length ? you_path : san_path;
short_path = you_path.length > san_path.length ? san_path : you_path;

console.log(long_path);

//trim path so they are equal
var len = long_path.length;
var done = false;
var count = 0;
for (var i = len - 1; i >= 0; i--) {
	if (long_path[i] === short_path[short_path.length - 1]) {
		done = true;
		break;
	}
	if (i === short_path.length - 1)
		break;
	count += 1;
}

//go back until paths match
var slen = short_path.length;
if (!done)
	for (var i = slen - 1; i >=0; i--) {
		if (short_path[i] === long_path[i])
			break;
		count += 2;
	}

console.log('count', count);
