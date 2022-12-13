const { readData, debugToFile } = require("../utils.js");

console.log('day13');
const fileName = 'test';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n\n");
// console.log(a1);

const a2 = a1.map(item => {
    return item.split('\n');
});
// console.log(a2);

const getNumber = (idx, row) => {
    let num = row[idx];
    while (true) {
        idx++;
        if (!isNaN(row[idx])) {
            num += row[idx];
        } else {
            break;
        }
    }
    return [idx - 1, num];
}

let sumRowId = 0;
a2.forEach((row, rowId) => {
    let zidx = 0;
    let R0 = row[0]; let R1 = row[1];
    for (let cidx = 0; cidx < R0.length; cidx++) {
        let c = R0[cidx];
        let z = R1[zidx];

        console.log(zidx, row, c, z);

        if (!isNaN(c) && !isNaN(z)) {
            const [ccidx, cc] = getNumber(cidx, R0);
            const [zzidx, zz] = getNumber(zidx, R1);
            cidx = ccidx; c = cc;
            zidx = zzidx; z = zz;
            if (c < z) {
                console.log(`${c} < ${z}`);
                sumRowId += rowId + 1;
                break;
            } else if (c > z) {
                break;
            }
        } else if (c !== z) {
            console.log('not equal');
            if (!Number.isNaN(c)) {
                if (z === ']') {
                    break;
                } else if (z === '[') {
                    const [ccidx, cc] = getNumber(cidx, R0);
                    console.log(ccidx, cc);
                }
            }
            if (c === '[') {
                if (z === '],8') { }
            } else if (z === '[') {

            } else if (c === ']') {
                // sumRowId += rowId + 1;
                // break;
            } else {

            }
        }
        zidx++;
    }
});

console.log("[ < 1", ',' < '0');
console.log('\n\n');
console.log('answer part1', '');
console.log('\n\n');


console.log('answer part2', '');
console.log('\n\n');
