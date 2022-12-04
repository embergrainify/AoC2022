const fs = require('fs');

console.log('day4');

let rawData = '';

try {
    rawData = fs.readFileSync('input', 'utf8');
} catch (err) {
    console.error(err);
}

if (rawData === '') return;

const isAInsideB = (a, b) => {
    if (
        (+a[0] >= +b[0]) && (+a[0] <= +b[1]) && (+a[1] >= +b[0]) && (+a[1] <= +b[1])
    ) {
        return true;
    } else {
        return false;
    }
}

const isOneInside = (a, b) => {
    if (isAInsideB(a, b) || isAInsideB(b, a)) {
        console.log(`['${a}', '${b}'] = true`);
        return true;
    } else {
        console.log(`[[${a}], [${b}]] = false`);
        return false;
    }
}

const a1 = rawData.toString().split("\n");
// console.log(a1);
const a2 = a1.map(item => item.split(',').map(it => it.split('-')));
// console.log(a2);
const a3 = a2.map(item => isOneInside(item[0], item[1]));
// console.log(a3);
const count = a3.filter(item => item===true).length
console.log('answer part1', count);



const isAOverlapB = (a, b) => {
    if (
        (+a[0] >= +b[0]) && (+a[0] <= +b[1]) || (+a[1] >= +b[0]) && (+a[1] <= +b[1])
    ) {
        return true;
    } else {
        return false;
    }
}

const isOneOverlap = (a, b) => {
    if (isAOverlapB(a, b) || isAOverlapB(b, a)) {
        console.log(`['${a}', '${b}'] = true`);
        return true;
    } else {
        console.log(`[[${a}], [${b}]] = false`);
        return false;
    }
}
const b1 = a2.map(item => isOneOverlap(item[0], item[1]));
console.log(b1);
const count2 = b1.filter(item => item===true).length
console.log('answer part2', count2);
