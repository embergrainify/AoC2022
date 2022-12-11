const { readData, debugToFile } = require("../utils.js");

console.log('day11');
const fileName = 'input';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n\n");
// console.log(a1);

const a2 = a1.map(item => {
    return item.split('\n');
});
// console.log(a2);

const items = [];
const operations = [];
const monkeyThrowCount = [];

a2.forEach((item) => {
    // console.log('->', item);
    items.push(item[1].slice(18).split(', ').map(i => +i));

    const o1 = item[2].slice(19).split(' ');
    if (o1[2] === 'old') o1[2] = -1;

    const truefalseToMonkey = [+item[4].slice(29), +item[5].slice(30)];

    const oper = [[o1[1], +o1[2]], +item[3].slice(21), truefalseToMonkey];
    operations.push(oper);

    monkeyThrowCount.push(0);
});

// console.log('items before inspecting => ', items);
// console.log('operations => ', operations);

const operate = (worryLevel, operation) => {
    // console.log(worryLevel, operation);
    let wl;
    const v = operation[0][1] === -1 ? worryLevel : operation[0][1];
    // console.log(v);
    if (operation[0][0] === '*') {
        wl = worryLevel * v;
    } else if (operation[0][0] === '+') {
        wl = worryLevel + v;
    }
    // console.log('wl ', wl);

    wl = Math.floor(wl / 3);
    // console.log('wl ', wl);
    if (wl % operation[1] === 0) {
        items[operation[2][0]].push(wl);
        // console.log('throw ', operation[2][0], wl);
    } else {
        items[operation[2][1]].push(wl);
        // console.log('throw ', operation[2][1], wl);
    }
}

for (let i = 0; i < 20; i++) {
// for (let i = 0; i < 1; i++) {
    items.forEach((item, idx) => {
        // console.log(item);
        while (item.length > 0) {
            const wl = item.shift();
            operate(wl, operations[idx]);
            monkeyThrowCount[idx]++;
        }
    });
    // console.log('after round ', i, items);
    // console.log('after round ', i, monkeyThrowCount);
}
console.log('after round ', monkeyThrowCount);

const sorted = monkeyThrowCount.sort((a, b) => a - b);
const len = sorted.length;
const ans1 = sorted[len - 1] * sorted[len - 2];

console.log('\n\n');
console.log('answer part1', ans1);
console.log('\n\n');


const items2 = [];
const operations2 = [];
const monkeyThrowCount2 = [];

a2.forEach((item) => {
    // console.log('->', item2);
    items2.push(item[1].slice(18).split(', ').map(i => +i));

    const o1 = item[2].slice(19).split(' ');
    if (o1[2] === 'old') o1[2] = -1;

    const truefalseToMonkey = [+item[4].slice(29), +item[5].slice(30)];

    const oper = [[o1[1], +o1[2]], +item[3].slice(21), truefalseToMonkey];
    operations2.push(oper);

    monkeyThrowCount2.push(0);
});

// console.log('items before inspecting => ', items2);
// console.log('operations => ', operations2);

let supermodulo = 1;
operations2.forEach(item => {
    supermodulo *= item[1];
});
console.log('supermodulo', supermodulo);

const operate2 = (worryLevel, operation) => {
    // console.log(worryLevel, operation);
    let wl;
    const v = operation[0][1] === -1 ? worryLevel : operation[0][1];
    // console.log(v);
    if (operation[0][0] === '*') {
        wl = worryLevel * v;
    } else if (operation[0][0] === '+') {
        wl = worryLevel + v;
    }
    // console.log('wl ', wl);

    // wl = Math.floor(wl / 3);
    wl = wl % supermodulo;

    // console.log('wl ', wl);
    if (wl % operation[1] === 0) {
        items2[operation[2][0]].push(wl);
        // console.log('throw ', operation[2][0], wl);
    } else {
        items2[operation[2][1]].push(wl);
        // console.log('throw ', operation[2][1], wl);
    }
}

for (let i = 0; i < 10000; i++) {
// for (let i = 0; i < 1000; i++) {
    items2.forEach((item, idx) => {
        // console.log(item);
        while (item.length > 0) {
            const wl = item.shift();
            operate2(wl, operations2[idx]);
            monkeyThrowCount2[idx]++;
        }
    });
    // console.log('after round ', i, items2);
    // console.log('after round ', i, monkeyThrowCount2);
}
console.log('after round ', monkeyThrowCount2);

const sorted2 = monkeyThrowCount2.sort((a, b) => (a < b) ? -1 : ((a > b) ? 1 : 0));
const len2 = sorted2.length;
const ans2 = sorted2[len2 - 1] * sorted2[len2 - 2];

console.log('answer part2', ans2);
console.log('\n\n');
