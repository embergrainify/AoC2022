const fs = require('fs');

console.log('day6');

let rawData = '';

try {
    rawData = fs.readFileSync('input', 'utf8');
} catch (err) {
    console.error(err);
}

if (rawData === '') return;

const a1 = rawData.toString().split("\n");
console.log(a1);

let pos = 0;
a1.forEach(item => {
    const len = item.length;
    pos = 0;
    // [...item].forEach((_, i) => {
    //     const sli = item.slice(i, i + 4);
    //     console.log(sli);
    // });
    // for (let c of item) {
    //     process(c)
    // }
    for (let i = 0; i < len; i++) {
        const sli = item.slice(i, i + 4);
        console.log(sli);
        if (!(/(.).*\1/.test(sli))) {
            pos = i;
            break;
        }
    }
    console.log(pos + 4);
});
console.log('answer part1', pos + 4);

a1.forEach(item => {
    const len = item.length;
    pos = 0;
    for (let i = 0; i < len; i++) {
        const sli = item.slice(i, i + 14);
        console.log(sli);
        if (!(/(.).*\1/.test(sli))) {
            pos = i;
            break;
        }
    }
    console.log(pos + 14);
});
console.log('answer part2', pos + 14);