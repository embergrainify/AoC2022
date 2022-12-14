const { readData, debugToFile } = require("../utils.js");

console.log('day13');
const fileName = 'input';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n\n");
// console.log(a1);

const a2 = a1.map(item => {
    return item.split('\n');
});
// console.log(a2);

const a3 = a2.map(item => item.map(it => JSON.parse(it)));
// console.log(a3);


const compareABIsRight = (a, b) => {
    // console.log('-- ', a, '--', b);
    if ((a == undefined) && (b == undefined)) {
        return 0;
    } else if ((a == undefined) && (b != undefined)) {
        return 1;
    } else if ((a != undefined) && (b == undefined)) {
        return -1;
    } else if (!Array.isArray(a) && Array.isArray(b)) {
        bb = b;
        while (Array.isArray(bb)) {
            a = [a];
            bb = bb[0];
        }
        return compareABIsRight(a, b);
    } else if (!Array.isArray(b) && Array.isArray(a)) {
        b = [b];
        aa = a;
        while (Array.isArray(aa)) {
            b = [b];
            aa = aa[0];
        }
        return compareABIsRight(a, b);
    } else if (!Array.isArray(a) && !Array.isArray(b)) {
        // console.log('---- number ----', a, b);
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    } else {
        // Both is array
        const res = compareABIsRight(a[0], b[0]);
        if (res === 0) {
            if ((a[1] != undefined) && (b[1] != undefined)) {
                return compareABIsRight(a[1], b[1]);
            } else if ((a[1] == undefined) && (b[1] != undefined)) {
                return 1;
            } else if ((a[1] != undefined) && (b[1] == undefined)) {
                return -1;
            } else {
                return 0;
            }
        } else {
            return res;
        }
    }

}
// console.log('compareAB', compareABIsRight([1], [1, 2]));


let sumRowId = 0;
a3.forEach((row, rowId) => {
    let R0 = row[0]; let R1 = row[1];

    // console.log(R0, '=', R1);
    let res = -2;
    let zidx = 0;
    for (let cidx = 0; cidx <= R0.length; cidx++) {
        if (R1[zidx] == undefined) {
            res = -1;
            break;
        } else {
            res = compareABIsRight(R0[cidx], R1[zidx]);
            if (res === 1) {
                sumRowId += rowId + 1;
                break;
            } else if (res === -1) {
                break;
            }
        }
        zidx++;
    }
    // console.log('RESULT', res);
    // console.log('\n\n');
});

console.log('\n\n');
console.log('answer part1', sumRowId);
console.log('\n\n');

const sortit = (a, b) => {
    if (!Array.isArray(a) && !Array.isArray(b)) {
        return a - b;
    }

    const [leftArray, rightArray] = [a, b].map((x) => Array.isArray(x) ? x : [x]);
    while (leftArray.length && rightArray.length) {
        const result = sortit(leftArray.shift(), rightArray.shift());
        if (result !== 0) {
            return result;
        }
    }
    if (leftArray.length) {
        return 1;
    }
    if (rightArray.length) {
        return -1;
    }
    return 0;
};

const alllist = rawData.split('\n').filter(item => item.length !== 0).map(item => JSON.parse(item));
// console.log(alllist);

alllist.push([[2]], [[6]]);
// console.log(alllist);

alllist.sort((a, b) => {
    a = JSON.parse(JSON.stringify(a));
    b = JSON.parse(JSON.stringify(b));
    return sortit(a, b);
});
// console.log(alllist);

const array2index = alllist.findIndex(item => JSON.stringify(item) === JSON.stringify([[2]])) + 1;
const array6index = alllist.findIndex(item => JSON.stringify(item) === JSON.stringify([[6]])) + 1;
const ans2 = array2index * array6index;

console.log('answer part2', ans2);
console.log('\n\n');
