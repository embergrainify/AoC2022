const fs = require('fs');

console.log('day3');

let rawData = '';

try {
    rawData = fs.readFileSync('input', 'utf8');
} catch (err) {
    console.error(err);
}

if (rawData === '') return;

const findDup = (aos) => {
    const aos0 = aos[0].split('');
    let c = '';
    aos0.some(item => {
        c = item;
        return aos[1].indexOf(item) > -1;
    });
    return c;
}

const findDup2 = (aos) => {
    const aos0 = aos[0].split('');
    let c = '';
    aos0.some(item => {
        c = item;
        return (aos[1].indexOf(item) > -1) && (aos[2].indexOf(item) > -1);
    });
    return c;
}

const a1 = rawData.toString().split("\n");
// console.log(a1);
const a2 = a1.map(item => [item.slice(0, item.length / 2), item.slice(item.length / 2)]);
// console.log(a2);
const a3 = a2.map(item => findDup(item));
// console.log(a3);
const a4 = a3.map(item => {
    const d = item.charCodeAt();
    return d < 91 ? d - 38 : d - 96;
});
// console.log(a4);
const sum = a4.reduce((a, b) => a + b);

console.log('answer part1', sum);



let arr = [];
let res = [];
a1.forEach((item, i) => {
    const m = i % 3;
    if (m === 0) arr = [];
    arr.push(item);
    if (m === 2) res.push(arr);
});
// console.log(res);
const b1 = res.map(item => findDup2(item));
console.log(b1);

const b2 = b1.map(item => {
    const d = item.charCodeAt();
    return d < 91 ? d - 38 : d - 96;
});

const sum2 = b2.reduce((a, b) => a + b)

console.log('answer part2', sum2);