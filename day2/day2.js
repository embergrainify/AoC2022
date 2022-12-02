const fs = require('fs');

console.log('day2');

let rawData = '';

try {
    rawData = fs.readFileSync('input', 'utf8');
} catch (err) {
    console.error(err);
}

if (rawData === '') return;

const getScore = (fight) => {
    const score = {
        AX: 4,
        AY: 8,
        AZ: 3,
        BX: 1,
        BY: 5,
        BZ: 9,
        CX: 7,
        CY: 2,
        CZ: 6
    }
    return score[fight];
}

const getScore2 = (fight) => {
    const score = {
        AX: 3,
        AY: 4,
        AZ: 8,
        BX: 1,
        BY: 5,
        BZ: 9,
        CX: 2,
        CY: 6,
        CZ: 7
    }
    return score[fight];
}

const a1 = rawData.toString().split("\n");
console.log(a1);
const a2 = a1.map(item => item.replace(" ", ""));
console.log(a2);
const a3 = a2.map(item => getScore(item));
console.log(a3);
const sum = a3.reduce((a,b) => a+b);

console.log('answer part1', sum);

const a4 = a2.map(item => getScore2(item));
const sum2 = a4.reduce((a,b) => a+b)

console.log('answer part2', sum2);