const fs = require('fs');

console.log('day1');

let rawData = '';

try {
    rawData = fs.readFileSync('input', 'utf8');
} catch (err) {
    console.error(err);
}

if (rawData === '') return;

const a1 = rawData.toString().split("\n\n");
const a2 = a1.map(item => item.split("\n"));
console.log(a2[0]);
const a3 = a2.map(item => +item.reduce((a, b) => +a + +b));
console.log(a3[0]);
const m = Math.max(...a3);

console.log('answer part1', m);

const s1 = a3.sort((a, b) => a - b);
const sum3 = s1[s1.length - 1] + s1[s1.length - 2] + s1[s1.length - 3];

console.log('answer part2', sum3);