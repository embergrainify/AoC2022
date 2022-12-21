const { readData, debugToFile } = require("../utils.js");

console.log('day21');
// const fileName = 'test';
const fileName = 'input';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n");
// console.log(a1);

let data = {};
let data2 = {};
a1.forEach(item => {
    const d = item.split(': ');
    data[d[0]] = isNaN(d[1]) ? d[1] : +d[1];
    data2[d[0]] = isNaN(d[1]) ? d[1] : +d[1];
});
// console.log(data);

const recurCalc = (key) => {
    if (isNaN(data[key])) {
        const f = data[key].split(' ');
        const operator = f[1];
        let res;
        switch (operator) {
            case '+':
                res = recurCalc(f[0]) + recurCalc(f[2]);
                break;
            case '-':
                res = recurCalc(f[0]) - recurCalc(f[2]);
                break;
            case '*':
                res = recurCalc(f[0]) * recurCalc(f[2]);
                break;
            case '/':
                res = recurCalc(f[0]) / recurCalc(f[2]);
                break;
            default:
                break;
        }
        return res;
    } else {
        return data[key];
    }
}

const ans1 = recurCalc('root');


console.log('\n\n');
console.log('answer part1', ans1);
console.log('\n\n');


const root = data['root'].split(' ');
const humn = data['humn'];

// change item1 to equal to item2
let itemL, itemR;
let constant = 99099099099099; // this comes from trial and error to decreasing loop count

data['humn'] = humn;
itemL = recurCalc(root[0]);
itemR = recurCalc(root[2]);
console.log('Original', data['humn'], itemL, itemR, Math.abs(itemL - itemR));


data['humn'] = humn + constant;
itemL = recurCalc(root[0]);
itemR = recurCalc(root[2]);
const diffWhenPlus = Math.abs(itemL - itemR);
console.log('diffWhenPlus', data['humn'], itemL, itemR, diffWhenPlus);

data['humn'] = humn - constant;
itemL = recurCalc(root[0]);
itemR = recurCalc(root[2]);
const diffWhenMinus = Math.abs(itemL - itemR);
console.log('diffWhenMinus', data['humn'], itemL, itemR, diffWhenMinus);


if (diffWhenPlus < diffWhenMinus) {
    constant = +constant;
} else {
    constant = -constant;
}



console.log('\n\n');


let ans2;
let prevDiff = Infinity;
let i = 0;
while (true) {
    i++;
    data['humn'] = data['humn'] + constant;
    itemL = recurCalc(root[0]);
    itemR = recurCalc(root[2]);
    const diff = Math.abs(itemL - itemR);
    console.log(i, 'diff', data['humn'], itemL, itemR, diff);

    if (diff > prevDiff) {
        constant *= -1/2;
    }
    prevDiff = diff;

    if (diff < 0.01) {
        ans2 = Math.round(data['humn']);
        break;
    }
}

data['humn'] = ans2;
itemL = recurCalc(root[0]);
itemR = recurCalc(root[2]);
console.log('Test Answer', data['humn'], itemL, itemR, Math.abs(itemL - itemR));

console.log('answer part2', ans2);
console.log('\n\n');
