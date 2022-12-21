const { readData, debugToFile } = require("../utils.js");

console.log('day16');
const fileName = 'test';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n");
// console.log(a1);

let valves = {}
a1.forEach(item => {
    const item2 = item.split(' has flow rate=');
    const v = item2[0].slice(6, 8);
    valves[v] = {};
    let item3;
    if (item2[1].indexOf('tunnels') > -1) {
        item3 = item2[1].split('; tunnels lead to valves ');
    } else {
        item3 = item2[1].split('; tunnel leads to valve ');
    }
    valves[v].release = +item3[0];
    if (item3[1].length > 2) {
        valves[v].next = item3[1].split(', ');
    } else {
        valves[v].next = item3[1];
    }

});
// console.log(valves);

let path = [];
let nextPath = [...valves['AA'].next];
console.log(nextPath);
const minutes = 28;
while (true) {
    console.log(v, valves[v]);
    for (let i = minutes; i > 0; i--) {
        
    }
    if (nextPath.length === 0) break;
}
console.log('\n\n');
console.log('answer part1', '');
console.log('\n\n');



console.log('answer part2', '');
console.log('\n\n');
