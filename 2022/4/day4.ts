#! /usr/bin/env node
import fs from "fs";

const input: Array<string> = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n");
const array: Array<Array<string>> = input.map((entry) => entry.split("\n"));

const coupleFullyContainsOther = (
  couple1: Array<number>,
  couple2: Array<number>
) =>
  (couple1[0] <= couple2[0] && couple1[1] >= couple2[1]) ||
  (couple2[0] <= couple1[0] && couple2[1] >= couple1[1]);

const coupleOverlapEachOther = (
  couple1: Array<number>,
  couple2: Array<number>
) =>
  (couple1[0] >= couple2[0] && couple1[0] <= couple2[1]) ||
  (couple1[1] >= couple2[0] && couple1[0] <= couple2[1]);

let pairs1 = 0;
let pairs2 = 0;
array.forEach((couple) => {
  const couples = couple[0].split(",");
  const one = couples[0].split("-");
  const two = couples[1].split("-");

  const couple1 = one.map((entry) => parseInt(entry));
  const couple2 = two.map((entry) => parseInt(entry));

  if (coupleFullyContainsOther(couple1, couple2)) { pairs1++ }
  if (coupleOverlapEachOther(couple1, couple2)) { pairs2++ }
});

console.log(`1. ${pairs1} 2. ${pairs2}`);
