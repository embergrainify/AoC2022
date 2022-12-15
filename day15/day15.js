const { readData, debugToFile } = require("../utils.js");

console.log('day15');
const fileName = 'input';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n");
// console.log(a1);

const a2 = a1.map(item => {
    const sp = item.split('=');
    const x1 = +sp[1].split(',')[0];
    const y1 = +sp[2].split(':')[0];
    const x2 = +sp[3].split(',')[0];
    const y2 = +sp[4];
    return [x1, y1, x2, y2];
});
// console.log(a2);

const theLine = (fileName === 'test') ? 20 : 2000000;
console.log('the line', theLine);

const lineSet = new Set();
a2.forEach(item => {
    const Sx = item[0];
    const Sy = item[1];
    const Bx = item[2];
    const By = item[3];
    const dx = Math.abs(Sx - Bx);
    const dy = Math.abs(Sy - By);
    const distance = dx + dy;
    // if theLine all between top and bottom distance from Sy
    if ((theLine >= Sy - distance) && (theLine <= Sy + distance)) {
        const far = Math.abs(Sy - theLine);
        lineSet.add(Sx);
        // loop to add Sx to left and right of S
        for (let i = 1; i <= distance - far; i++) {
            lineSet.add(Sx - i);
            lineSet.add(Sx + i);
        }
        // if Beacon falls in theLine then remove it
        if (By === theLine) {
            lineSet.add(Bx);
            lineSet.delete(Bx);
        }
    }
});



console.log('\n\n');
console.log('answer part1', lineSet.size);
console.log('\n\n');

const maxLine = (fileName === 'test') ? 20 : 4000000;
console.log('maxLine', maxLine);

const b1 = a2.map(item => {
    const Sx = item[0];
    const Sy = item[1];
    const Bx = item[2];
    const By = item[3];
    const dx = Math.abs(Sx - Bx);
    const dy = Math.abs(Sy - By);
    const range = dx + dy;
    return [Sx, Sy, range];
});
// console.log(b1);

let ans2;
for (let x = 0; x <= maxLine; x++) {
    let y = 0;
    while (y <= maxLine) {
        let found = false;
        for (const item of b1) {
            const Sx = item[0];
            const Sy = item[1];
            const range = item[2];
            const dist = Math.abs(x - Sx) + Math.abs(y - Sy);
            // console.log(Sx, Sy, range, dist);
            if (dist <= range) {
                let xDist = Math.abs(x - Sx);
                let yDist = range - xDist;
                y = Sy + yDist; // set new y to skip some for speeding up
                found = true;
                break;
            }
        }
        // console.log('------');
        if (!found) {
            // console.log(`hole: x:${x}, y:${y}`);
            ans2 = x * 4000000 + y;
            break;
        }
        y++;
    }
}

console.log('answer part2', ans2);
console.log('\n\n');
