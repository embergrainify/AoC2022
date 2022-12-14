const { readData, debugToFile } = require("../utils.js");

console.log('day14');
const fileName = 'input';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n");
// console.log(a1);

const a2 = a1.map(item => item.split(' -> '));
// console.log(a2);

const a3 = a2.map(item => item.map(it => it.split(',')));
// console.log(a3);

let maxX = 0; let maxY = 0;
let scan = [];
const pushHash = (x, y) => {
    // console.log(x, y);
    if (scan[y] == undefined) scan[y] = [];
    scan[y][x] = '#';
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
}
a3.forEach(row => {
    // console.log(row);
    let prevX = 0; let prevY = 0;
    row.forEach((coor, idx) => {
        // console.log(coor);
        const x = +coor[0]; const y = +coor[1];
        if (idx > 0) {
            if (x === prevX) {
                let diffY = Math.abs(y - prevY);
                for (let c = 0; c < diffY; c++) {
                    if (y > prevY) {
                        pushHash(x, prevY + c + 1);
                    } else {
                        pushHash(x, prevY - c - 1);
                    }
                }
            } else {
                let diffX = Math.abs(x - prevX);
                for (let c = 0; c < diffX; c++) {
                    if (x > prevX) {
                        pushHash(prevX + c + 1, y);
                    } else {
                        pushHash(prevX - c - 1, y);
                    }
                }
            }
        } else {
            pushHash(x, y);
        }
        prevX = x; prevY = y;
    });
});

for (let y = 0; y < scan.length; y++) {
    if (scan[y] == undefined) scan[y] = [];
    // for (let x = 0; x < scan[y].length; x++) {
    //     if (scan[y][x] == undefined) scan[y][x] = '.';
    // }
}
// console.log('scan.length (y)', scan.length);
// console.log(scan);
// console.log('maxX, maxY', maxX, maxY, scan[maxY][maxX]);

let injectX = 500; let injectY = 0;
let sandX = injectX; let sandY = injectY;
let countSand = 0;
while (true) {
    sandY++;
    // console.log(sandX, sandY, scan[sandY][sandX]);

    if (scan[sandY + 1][sandX] != undefined) {
        // something under
        if (scan[sandY + 1][sandX - 1] != undefined) {
            // something on left
            if (scan[sandY + 1][sandX + 1] != undefined) {
                // something on right
                // console.log(sandX, sandY, 'o');
                scan[sandY][sandX] = 'o';
                countSand++;
                sandX = injectX; sandY = injectY;
            } else {
                sandX++;
            }
        } else {
            // nothing on left
            sandX--;
        }
    }
    if (sandY + 1 === maxY) {
        console.log(('fall'));
        break;
    }
}

console.log('\n\n');
console.log('answer part1', countSand);
console.log('\n\n');


scan = [];
a3.forEach(row => {
    // console.log(row);
    let prevX = 0; let prevY = 0;
    row.forEach((coor, idx) => {
        // console.log(coor);
        const x = +coor[0]; const y = +coor[1];
        if (idx > 0) {
            if (x === prevX) {
                let diffY = Math.abs(y - prevY);
                for (let c = 0; c < diffY; c++) {
                    if (y > prevY) {
                        pushHash(x, prevY + c + 1);
                    } else {
                        pushHash(x, prevY - c - 1);
                    }
                }
            } else {
                let diffX = Math.abs(x - prevX);
                for (let c = 0; c < diffX; c++) {
                    if (x > prevX) {
                        pushHash(prevX + c + 1, y);
                    } else {
                        pushHash(prevX - c - 1, y);
                    }
                }
            }
        } else {
            pushHash(x, y);
        }
        prevX = x; prevY = y;
    });
});

for (let y = 0; y < scan.length; y++) {
    if (scan[y] == undefined) scan[y] = [];
}

const floor = maxY + 2;
scan.push([]);
scan.push([]);

injectX = 500; injectY = -1;
sandX = injectX; sandY = injectY;
countSand = 0;
while (true) {
    sandY++;
    // console.log(sandX, sandY, scan[sandY][sandX]);

    if ((scan[sandY + 1][sandX] != undefined) || (sandY + 1 === floor)) {
        // something under
        if ((scan[sandY + 1][sandX - 1] != undefined) || (sandY + 1 === floor)) {
            // something on left
            if ((scan[sandY + 1][sandX + 1] != undefined) || (sandY + 1 === floor)) {
                // something on right
                // console.log(sandX, sandY, 'o');
                scan[sandY][sandX] = 'o';
                countSand++;
                if ((sandX === injectX) && (sandY - 1 === injectY)) break;
                sandX = injectX; sandY = injectY;
            } else {
                // nothing on right
                sandX++;
            }
        } else {
            // nothing on left
            sandX--;
        }
    }

    // if (sandY + 1 === floor) {
    //     scan[sandY][sandX] = 'o';
    //     countSand++;
    //     sandX = injectX; sandY = injectY;
    // }
    // if (sandY+1 === floor) {
    //     console.log(('fall'));
    //     break;
    // } 
}


console.log('answer part2', countSand);
console.log('\n\n');
