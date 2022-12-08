const { readData, debugToFile } = require("../utils.js");

console.log('day8');
const fileName = 'input';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n");
// console.log(a1);

let visibleTree = (a1.length * 4 - 4);
console.log('visibleTree', visibleTree);

const len = a1.length;
const rowTopMax = a1[0].split('');
const rowBottomMax = a1[len - 1].split('');
const countSet = new Set();
a1.forEach((item, idx, ar) => {
    if ((idx !== 0) && (idx !== (len - 1))) {
        const row = item.split('');
        let leftMax = row[0];
        let rightMax = row[len - 1];
        row.forEach((it, id, rr) => {
            if ((id !== 0) && (id !== (len - 1))) {
                if (leftMax < it) {
                    countSet.add(`${idx}-${id}`);
                    leftMax = it;
                }

                rightPos = len - 1 - id;
                if (rightMax < rr[rightPos]) {
                    countSet.add(`${idx}-${rightPos}`);
                    rightMax = rr[rightPos];
                }

                if (rowTopMax[id] < it) {
                    countSet.add(`${idx}-${id}`);
                    rowTopMax[id] = it;
                }
            }
        });
    }
});

//Loop over row in reverse to check bottom visibility
for (let i = len - 2; i > 0; i--) {
    const row = a1[i].split('');
    row.forEach((it, id, rr) => {
        if ((id !== 0) && (id !== (len - 1))) {
            if (rowBottomMax[id] < it) {
                countSet.add(`${i}-${id}`);
                rowBottomMax[id] = it;
            }
        }
    });
}

// console.log('countSet', countSet);
console.log('answer part1', countSet.size + visibleTree);

let scenicScore = 0;
a1.forEach((item, idx, ar) => {
    const row = item.split('');
    if ((idx !== 0) && (idx !== (len - 1))) {
        row.forEach((itt, id) => {
            const it = +itt;
            if ((id !== 0) && (id !== (len - 1))) {

                let countUp = 0;
                let countDown = 0;
                let countLeft = 0;
                let countRight = 0;

                const goUp = idx;
                const goDown = len - idx - 1;
                const goLeft = id;
                const goRight = len - id - 1;

                // debugToFile(`${goUp}, ${goDown}, ${goLeft}, ${goRight}\n`);

                // Go up
                let hUp = it;
                for (let i = 1; i <= goUp; i++) {
                    const nextt = +ar[idx - i][id];
                    countUp++;
                    if (nextt >= it) break;

                    // if (i === 1) {
                    //     if (it >= nextt) {
                    //         countUp++;
                    //     } else {
                    //         break;
                    //     }
                    //     hUp = nextt;
                    // } else {
                    //     if ((hUp <= it) && (hUp <= nextt)) {
                    //         countUp++;
                    //         hUp = nextt;
                    //     } else {
                    //         break;
                    //     }
                    // }
                }
                // debugToFile(`${countUp}\n`);
                //Go down
                let hDown = it;
                for (let i = 1; i <= goDown; i++) {
                    const nextt = +ar[idx + i][id];
                    countDown++;
                    if (nextt >= it) break;
                    // if (i === 1) {
                    //     if (it >= nextt) {
                    //         countDown++;
                    //     } else {
                    //         break;
                    //     }
                    //     hDown = nextt;
                    // } else {
                    //     if ((hDown <= it) && (hDown <= nextt)) {
                    //         countDown++;
                    //         hDown = nextt;
                    //     } else {
                    //         break;
                    //     }
                    // }
                }


                //Go left
                let hLeft = it;
                for (let i = 1; i <= goLeft; i++) {
                    const nextt = +ar[idx][id - i];

                    countLeft++;
                    if (nextt >= it) break;
                    // if (i === 1) {
                    //     if (it >= nextt) {
                    //         countLeft++;
                    //     } else {
                    //         break;
                    //     }
                    //     hLeft = nextt;
                    // } else {
                    //     if ((hLeft <= it) && (hLeft <= nextt)) {
                    //         countLeft++;
                    //         hLeft = nextt;
                    //     } else {
                    //         break;
                    //     }
                    // }
                }

                //Go right
                let hRight = it;
                for (let i = 1; i <= goRight; i++) {
                    const nextt = +ar[idx][id + i];
                    countRight++;
                    if (nextt >= it) break;
                    // if (i === 1) {
                    //     if (it >= nextt) {
                    //         countRight++;
                    //     } else {
                    //         break;
                    //     }
                    //     hRight = nextt;
                    // } else {
                    //     if ((hRight <= it) && (hRight <= nextt)) {
                    //         countRight++;
                    //         hRight = nextt;
                    //     } else {
                    //         break;
                    //     }
                    // }
                }

                // console.log(countUp, countDown, countLeft, countRight);
                // debugToFile(`${countUp}, ${countDown}, ${countLeft}, ${countRight}\n`);

                const cAll = countUp * countDown * countLeft * countRight;
                // debugToFile(`${cAll}\n`);
                // console.log('cAll', cAll);
                if (scenicScore < cAll) scenicScore = cAll;
            }
        });
        // console.log('-----');
    }
});


console.log('answer part2', scenicScore);
