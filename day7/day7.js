const fs = require('fs');

const debugToFile = (data) => {
    fs.writeFileSync("debug.txt", JSON.stringify(data), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    });
}

console.log('day7new');

let rawData = '';

try {
    rawData = fs.readFileSync('test', 'utf8');
} catch (err) {
    console.error(err);
}

if (rawData === '') return;

const a1 = rawData.toString().split("\n");
// console.log(a1);

let tree = {};
let treePos = [tree];

let sumOfLess100000 = 0;
a1.forEach((item, idx) => {
    const sp = item.split(' ');
    if (sp[0] === '$') {
        //command start with $
        if (sp[1] === 'cd') {
            if (sp[2] !== '..') {
                const lastPos = treePos[treePos.length - 1];
                if (!(sp[2] in lastPos)) lastPos[sp[2]] = { XSummary: 0 };
                treePos.push(lastPos[sp[2]]);
            } else {
                const prevPos = treePos.pop();
                if (prevPos.XSummary < 100000) {
                    sumOfLess100000 += prevPos.XSummary;
                }
                const lastPos = treePos[treePos.length - 1];
                lastPos.XSummary += prevPos.XSummary;
            }
            // console.log(treePos);
        }
    } else {
        if (sp[0] !== 'dir') {
            const lastPos = treePos[treePos.length - 1];
            lastPos.XSummary += +sp[0];
        }
    }
});
// console.log('tree', tree);

// SUM back to '/' because last line doesn't cd back to '/'
while (treePos.length > 1) {
    const prevPos = treePos.pop();
    if (prevPos.XSummary < 100000) {
        sumOfLess100000 += prevPos.XSummary;
    }
    const lastPos = treePos[treePos.length - 1];
    lastPos.XSummary += prevPos.XSummary;
}

// console.log('tree', tree);
// debugToFile(tree);

console.log('answer part1', sumOfLess100000);

console.log('\n\nUSED space: ', tree['/'].XSummary);
const unused = 70000000 - tree['/'].XSummary;
console.log('unused space: ', unused);
const requiredMore = 30000000 - unused;
console.log('Required more space: ', requiredMore);

let answerArray = [];
// use input data as a tool to traverse the tree
treePos = [tree];
a1.forEach(item => {
    const sp = item.split(' ');
    if ((sp[0] === '$') && (sp[1] === 'cd')) {
        if (sp[2] !== '..') {
            const lastPos = treePos[treePos.length - 1];
            treePos.push(lastPos[sp[2]]);
        } else {
            const prevPos = treePos.pop();
            if (prevPos.XSummary > requiredMore) {
                answerArray.push(prevPos.XSummary);
            }
        }
    }
});

while (treePos.length > 1) {
    const prevPos = treePos.pop();
    if (prevPos.XSummary > requiredMore) {
        answerArray.push(prevPos.XSummary);
    }
}

// actually need to do a last loop from treePos but this console.log show that it is less that requiredMore space
console.log(treePos);

console.log(answerArray);
console.log('answer part2', answerArray.sort((a, b) => a - b)[0]);
