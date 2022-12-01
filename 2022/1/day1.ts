#! /usr/bin/env node
import fs from "fs";

function fromFileToArray(filePath: string): Array<Array<number>> {
  const array: Array<string> = fs.readFileSync(filePath).toString().split("\n");
  let groupArray: Array<Array<number>> = [];
  let subArray: Array<number> = [];

  array.forEach((entry) => {
    if (entry !== "") {
      subArray.push(parseInt(entry));
    }
    if (entry === "") {
      groupArray.push(subArray);
      subArray = [];
    }
  });

  return groupArray;
}

function getBiggestNumberSum(array: Array<Array<number>>): number {
  let bigTotal = 0;
  array.forEach((subArray) => {
    const tempTotal = subArray.reduce((accumulator, entry) => {
      return accumulator + entry;
    }, 0);
    if (tempTotal >= bigTotal) {
      bigTotal = tempTotal;
    }
  });

  return bigTotal;
}

function getTop3(array: Array<Array<number>>) {
  let allsum: Array<number> = [];
  array.forEach((subArray) => {
    const tempTotal = subArray.reduce((accumulator, entry) => {
      return accumulator + entry;
    }, 0);
    allsum.push(tempTotal);
  });

  return allsum
    .sort(function (a, b) {
      return b - a;
    })
    .slice(0, 3)
    .reduce((accumulator, entry) => {
      return accumulator + entry;
    }, 0);
}

function solveDayOne() { 
  const elvesList = fromFileToArray("input.txt");
  const biggetsElf = getBiggestNumberSum(elvesList);
  const top3 = getTop3(elvesList);

  console.log(`
    - Greatest calorie count: ${biggetsElf}
    - Top 3: ${top3}
    `);
}

solveDayOne()