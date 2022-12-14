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

const a3 = a2.map(item => item.map(it => JSON.parse(it)));
// console.log(a3);

let sumRowId = 0;
a3.forEach((row, rowId) => {
    let R0 = row[0]; let R1 = row[1];

    console.log(R0, R1);

    let zidx = 0;
    for (let cidx = 0; cidx <= R0.length; cidx++) {
        let c = R0[cidx];
        let z = R1[zidx];

        console.log(cidx, c, z);

        let found = false;
        while (true) {
            if ((c == undefined) && (z != undefined)) {
                sumRowId += rowId + 1;
                found = true;
                break;
            } else if ((c != undefined) && (z == undefined)) {
                found = true;
                break;
            } else if ((c == undefined) && (z == undefined)) {
                break;
            }
            if (!Array.isArray(c)) {
                if (!Array.isArray(z)) {
                    if (c < z) {
                        console.log(`${c} < ${z}`);
                        sumRowId += rowId + 1;
                        found = true;
                        break;
                    } else if (c > z) {
                        found = true;
                        break;
                    } else {
                        break;
                    }
                } else {
                    let z0 = z[0];
                    do {
                        if (Array.isArray(z0)) {
                            z0 = z0[0];
                        } else {
                            break;
                        }
                    } while (true);
                }
    
            } else {
    
            }

        }
        if (found) break;
        zidx++;
    }
});

console.log('\n\n');
console.log('answer part1', '');
console.log('\n\n');


console.log('answer part2', '');
console.log('\n\n');
