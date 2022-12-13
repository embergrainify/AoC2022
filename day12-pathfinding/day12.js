const { readData, debugToFile } = require("../utils.js");

console.log('day12');
const fileName = 'test';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n");
// console.log(a1);

const a2 = a1.map(item => {
    return item.split('');
});
// console.log(a2);

const Spos = [];
const Epos = [];
const height = a2.length;
const width = a2[0].length;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const c = a2[y][x];
        if (c === 'S') {
            Spos.push(x);
            Spos.push(y);
            if (Epos.length > 0) {
                break;
            }
        } else if (c === 'E') {
            Epos.push(x);
            Epos.push(y);
            if (Spos.length > 0) {
                break;
            }
        }
    }
    if ((Epos.length > 0) && (Spos.length > 0)) {
        break;
    }
}
// console.log('Spos', Spos);
// console.log('Epos', Epos);

let frontier = [];
frontier.push(Spos);
let reached = new Set();
reached.add(`${Spos[0]}_${Spos[1]}`);
let came_from = {} // path A->B is stored as came_from[B] == A
came_from[`${Spos[0]}_${Spos[1]}`] = '';

const getSignalV = (pos) => a2[pos[1]][pos[0]];
const canGo = (curr, target) => {
    const currV = getSignalV(curr);
    const targetV = getSignalV(target);
    if (currV === 'S') return true;
    if ((currV.charCodeAt(0) + 1 === targetV.charCodeAt(0)) || (currV >= targetV)) return true;
    else return false;
}
const neighbors = (curr) => {
    const n = [];
    const x = curr[0];
    const y = curr[1];

    // console.log(currV, String.fromCharCode('a'.charCodeAt(0) + 1));
    let target = [x - 1, y];
    if ((target[0] >= 0) && canGo(curr, target)) n.push(target);
    
    target = [x + 1, y];
    if ((target[0] < width) && canGo(curr, target)) n.push(target);

    target = [x, y - 1];
    if ((target[1] >= 0) && canGo(curr, target)) n.push(target);

    target = [x, y + 1];
    if ((target[1] < height) && canGo(curr, target)) n.push(target);

    return n;
}

while (frontier.length > 0) {
    let current = frontier.shift();
    if (`${current[0]}_${current[1]}` === `${Epos[0]}_${Epos[1]}`) break; // Early Exit 
    // console.log(neighbors(current));
    neighbors(current).forEach(item => {
        const nextstr = `${item[0]}_${item[1]}`;

        // if (!reached.has(nextstr)) {
        //     frontier.push(item);
        //     reached.add(nextstr);
        // }

        if (!came_from.hasOwnProperty(nextstr)) {
            frontier.push(item);
            came_from[nextstr] = `${current[0]}_${current[1]}`;
        }
    });
}

// console.log(came_from);
let i = 0;
for (const key of Object.keys(came_from)) {
    console.log(i++, key + ":" + came_from[key]);
};

let current = `${Epos[0]}_${Epos[1]}`; //Goal
let start = `${Spos[0]}_${Spos[1]}`;
let path = [];
while (current !== start) {
    path.push(current);
    current = came_from[current];
} 
console.log(path);

console.log('\n\n');
console.log('answer part1', '');
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
