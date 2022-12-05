const fs = require('fs');

console.log('day5');

let rawData = '';

try {
    rawData = fs.readFileSync('input', 'utf8');
} catch (err) {
    console.error(err);
}

if (rawData === '') return;

const a1 = rawData.toString().split("\n\n");
// console.log(a1);
const a2 = a1.map(item => item.split("\n"));
// console.log(a2);
const col0 = a2[0].pop();
// console.log(`col0 '${col0}'`);
let col = [];
[...col0].forEach((c, i) => {
    if (c !== ' ') {
        col.push(i);
    }
});
// console.log('col', col);
const stack = a2[0];
const operation = a2[1];
// console.log('stack:', stack);
// console.log('operation', operation);

const opArray = operation.map(item => {
    const a = item.split(' ');
    return [+a[1], +a[3], +a[5]];
});
// console.log('opArray', opArray);

const reverseStack = stack.reverse();
// console.log(reverseStack);

const r1 = reverseStack.map(item => col.map(i => item[i]));
// console.log(r1);

let rowStack = [];
r1.forEach((item, i) => {
    if (i === 0) {
        item.forEach(it => {
            rowStack.push([it]);
        });
    } else {
        item.forEach((it, id) => {
            if (it !== ' ') rowStack[id].push(it);
        });
    }
});
// console.log('Original rowStack :=>', rowStack);
// const rowStackClone = [...rowStack]; //FOR PART 2 //Shalow Copy NOT WORK
const rowStackClone = JSON.parse(JSON.stringify(rowStack)); //Deep Copy

opArray.forEach(item => {
    let m = item[0]; //Move
    for (let i = 0; i < m; i++) {
        const p = rowStack[item[1]-1].pop(); //From
        rowStack[item[2]-1].push(p); //To
    }
    // console.log('rowStack', rowStack);
});

const ans1 = rowStack.map(item => item.pop()).join('');
console.log('answer part1', ans1);

console.log('Original rowStackClone :=>', rowStackClone);
opArray.forEach(item => {
    const m = item[0]; //Move
    const popArray = [];
    for (let i = 0; i < m; i++) {
        const p = rowStackClone[item[1]-1].pop(); //From
        popArray.push(p);
    }
    popArray.reverse();
    popArray.forEach(it => rowStackClone[item[2]-1].push(it)); //To

    // console.log('rowStackClone', rowStackClone);
});

const ans2 = rowStackClone.map(item => item.pop()).join('');
console.log('answer part2', ans2);
