const { readData, debugToFile } = require("../utils.js");

console.log('day10');
const fileName = 'input';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n");
// console.log(a1);

let tick = 1;
let X = 1;
let countRow = 0;
let addxStep1 = true;
let sum = 0;
while (tick <= 220) {
    const row = a1[countRow].split(' ');

    // console.log(countRow, a1[countRow]);
    // console.log(tick, X, tick * X);

    if ((tick === 20) || (tick === 60) || (tick === 100) || (tick === 140) || (tick === 180) || (tick === 220)) {
        sum += tick * X;
        // console.log(tick * X, countRow, a1[countRow]);
        // console.log('signal strength', tick, tick * X);
    }

    if (row[0] !== "noop") {
        if (addxStep1) {
            addxStep1 = false;
        } else {
            countRow++;
            addxStep1 = true;
            X += +row[1];
        }
    } else {
        countRow++;
    }

    tick++;
}

// console.log(PosSET);
console.log('answer part1', sum);
console.log('\n\n');


// const buf = [];
// [...Array(6).keys()].forEach(item => {
//     buf.push(Array.from('.'.repeat(40)));
// });
// buf[0][0] = '#';
// buf[5][5] = '#';

countRow = 0;
addxStep1 = true;
let spritePos = 1;
const buf = [[], [], [], [], [], []];
let c = '#';
buf.forEach(item => {
    for (let i = 0; i < 40; i++) {
        const row = a1[countRow].split(' ');

        if ((i >= spritePos - 1) && (i <= spritePos + 1)) {
            item.push(c);
        } else {
            item.push('.');
        }

        if (row[0] !== "noop") {
            if (addxStep1) {
                addxStep1 = false;
            } else {
                countRow++;
                addxStep1 = true;
                spritePos += +row[1];
            }
        } else {
            countRow++;
        }
    }
});

console.log('\n\n');
console.log('answer part2');
const lineNum1 = Array.from(Array(4).keys());
console.log(lineNum1.join('-------------------'));
const ten = Array.from(Array(10).keys());
const lineNum2 = ten.join(' ') + ' ' + ten.join(' ') + ' ' + ten.join(' ') + ' ' + ten.join(' ');
console.log(lineNum2);

const buffer = [];
[...Array(6).keys()].forEach((item, idx) => {
    buffer.push(buf[idx].join(' '));
});
buffer.forEach(item => {
    console.log(item);
});

console.log(lineNum2);
console.log(lineNum1.join('-------------------'));


// console.log(posSet);
// console.log('answer part2', posSet.size);
