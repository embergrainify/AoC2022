const { readData, debugToFile } = require("../utils.js");

console.log('day9');
const fileName = 'input';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n");
// console.log(a1);

let Hpos = [0, 0];
let Tpos = [0, 0];
let PosSET = new Set();
PosSET.add(`${Tpos[0]}-${Tpos[1]}`);

// enum RelativePositionToTail {
//     topleft,
//     top,
//     topright,
//     right,
//     bottomright,
//     bottom,
//     bottomleft,
//     left,
//     center
// }
const RelativePositionToTail = Object.freeze({
    topleft: 11,
    top: 12,
    topright: 13,
    left: 21,
    center: 22,
    right: 23,
    bottomleft: 31,
    bottom: 32,
    bottomright: 33
});

// . is current relative position to T, x is target move
const visual = `
  x x x
x . . . x
x . T . x
x . . . x
  x x x 
`;

let currRPos = RelativePositionToTail.center;

const Hmove = (direction) => {
    switch (direction) {
        case 'R':
            //if T requires to move too else just move the H
            if (
                (currRPos === RelativePositionToTail.topright) ||
                (currRPos === RelativePositionToTail.right) ||
                (currRPos === RelativePositionToTail.bottomright)
            ) {
                Tpos[0] = Hpos[0]; Tpos[1] = Hpos[1];
                PosSET.add(`${Tpos[0]}-${Tpos[1]}`);
                currRPos = RelativePositionToTail.right;
            } else {
                currRPos += 1;
            }
            Hpos[0] += 1;
            break;
        case 'U':
            //if T requires movement else just move the H
            if (
                (currRPos === RelativePositionToTail.topleft) ||
                (currRPos === RelativePositionToTail.top) ||
                (currRPos === RelativePositionToTail.topright)
            ) {
                Tpos[0] = Hpos[0]; Tpos[1] = Hpos[1];
                PosSET.add(`${Tpos[0]}-${Tpos[1]}`);
                currRPos = RelativePositionToTail.top;
            } else {
                currRPos -= 10;
            }
            Hpos[1] -= 1;
            break;
        case 'L':
            //if T requires movement else just move the H
            if (
                (currRPos === RelativePositionToTail.topleft) ||
                (currRPos === RelativePositionToTail.left) ||
                (currRPos === RelativePositionToTail.bottomleft)
            ) {
                Tpos[0] = Hpos[0]; Tpos[1] = Hpos[1];
                PosSET.add(`${Tpos[0]}-${Tpos[1]}`);
                currRPos = RelativePositionToTail.left;
            } else {
                currRPos -= 1;
            }
            Hpos[0] -= 1;
            break;
        case 'D':
            //if T requires movement else just move the H
            if (
                (currRPos === RelativePositionToTail.bottomleft) ||
                (currRPos === RelativePositionToTail.bottom) ||
                (currRPos === RelativePositionToTail.bottomright)
            ) {
                Tpos[0] = Hpos[0]; Tpos[1] = Hpos[1];
                PosSET.add(`${Tpos[0]}-${Tpos[1]}`);
                currRPos = RelativePositionToTail.bottom;
            } else {
                currRPos += 10;
            }
            Hpos[1] += 1;
            break;
    }
    // console.log(direction, currRPos);
}

a1.forEach((item, idx) => {
    const row = item.split(' ');
    let i = +row[1];
    while (i--) {
        Hmove(row[0]);
    }
});

// console.log(PosSET);
console.log('answer part1', PosSET.size);



// The 10 knots
// let knots = Array(10).fill({ x: 0, y: 0 }); //This is wrong fill same object ref to the whole array
let knots = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
];
const posSet = new Set();
function markPos() {
    const T = knots[knots.length - 1];
    posSet.add(`${T.x},${T.y}`);
}
function follow(H, T) {
    const dx = H.x - T.x;
    const dy = H.y - T.y;
    if (Math.abs(dx) === 2 || Math.abs(dy) === 2) {
        T.x += Math.sign(dx);
        T.y += Math.sign(dy);
    }
}
function step(dir) {
    // console.log('---');
    let H = knots[0];
    if (dir === "R") H.x += 1;
    if (dir === "L") H.x -= 1;
    if (dir === "U") H.y -= 1;
    if (dir === "D") H.y += 1;
    for (const T of knots.slice(1)) {
        // console.log(H, T);
        follow(H, T);
        H = T;
    }
    markPos();
    // console.log('---');
}

a1.forEach((item) => {
    const row = item.split(' ');
    let i = +row[1];
    while (i--) {
        step(row[0]);
    }
});

// console.log(posSet);
console.log('answer part2', posSet.size);
