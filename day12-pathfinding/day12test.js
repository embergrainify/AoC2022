const { readData, debugToFile } = require("../utils.js");

console.log('day12');
const fileName = 'input';

const rawData = readData(fileName);
const a1 = rawData.toString().split("\n");
// console.log(a1);

const a2 = a1.map(item => {
    return item.split('');
});
// console.log(a2);
const input = a2;

const asStr = (pos) => pos.join(",");

const getNeighbors = ([x, y]) => [
  [x - 1, y],
  [x + 1, y],
  [x, y - 1],
  [x, y + 1],
];
const inBounds = ([x, y]) => x >= 0 && y >= 0 && x < input[0].length && y < input.length;

function heightVal(p) {
  let x = input[p[1]][p[0]];
  if (x === "S") return 0;
  if (x === "E") return 25;
  return x.charCodeAt(0) - "a".charCodeAt(0);
}

const connectionsMap = new Map();
const lowestPoints = [];
let bestSolution = Infinity;

let startPos;
let destPos;

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    const pos = [x, y];
    if (input[y][x] === "E") destPos = pos;
    if (input[y][x] === "S") startPos = pos;
    else if (heightVal(pos) === 0) lowestPoints.push(pos);
    connectionsMap.set(
      asStr(pos),
      getNeighbors(pos)
        .filter(inBounds)
        .filter((other) => heightVal(other) - heightVal(pos) < 2)
    );
  }
}

function findShortestPath(startPos) {
  const shortestPathTo = new Map();

  let searchList = [[startPos, 0]];
  while (searchList.length) {
    const [pos, steps] = searchList.pop();
    // If this is worse than a previous solution, give up
    if (steps > bestSolution) continue;

    const others = connectionsMap.get(asStr(pos)).filter((other) => {
      if (steps + 1 < (shortestPathTo.get(asStr(other)) ?? Infinity)) {
        shortestPathTo.set(asStr(other), steps + 1);
        return true;
      } else {
        return false;
      }
    });
    searchList.unshift(...others.map((o) => [o, steps + 1]));
  }

  // Return the shortest path we found to the destination: might not have one if we gave up due to exceeding
  //   bestSolution on all paths
  return shortestPathTo.get(asStr(destPos)) ?? Infinity;
}

const p1 = findShortestPath(startPos);
// console.log(p1);
console.log('\n\n');
console.log('answer part1', p1);
console.log('\n\n');

bestSolution = p1;
for (const lowestPoint of lowestPoints) {
  const res = findShortestPath(lowestPoint);
  bestSolution = Math.min(res, bestSolution);
}
console.log(bestSolution);





console.log('answer part2', '');
console.log('\n\n');
