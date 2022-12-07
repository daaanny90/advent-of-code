#! /usr/bin/env node
import fs from "fs";

const input: Array<string> = fs.readFileSync("input.txt").toString().split("\n");
const stringArray = [...input[0]];

let counter = 0;
let part1 = 0;
let part2 = 0;
let part1Solved = false;
let marker: Array<string> = [];

for (let i = 0; i < stringArray.length; i++) {
  if (marker.includes(stringArray[i])) {
    marker = [];
    counter++;
    i = counter;
  }
  marker.push(stringArray[i]);
  if (!part1Solved) {
    if (marker.length === 4) {
      part1 = i + 1;
      i = 0
      counter = 0
      part1Solved = true
    }
  }

  if (marker.length === 14) {
    part2 = i + 1;
    break;
  }
}
console.log(`1. ${part1} 2. ${part2}`);
