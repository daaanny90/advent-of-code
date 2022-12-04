#! /usr/bin/env node
import fs from "fs";

const input: Array<string> = fs.readFileSync("input.txt").toString().split("\n");

const alpha = Array.from(Array(26)).map((_, i) => i + 65);
const elements1 = alpha.map((x) => String.fromCharCode(x).toLowerCase());
const elements2 = alpha.map((x) => String.fromCharCode(x));
const elements = elements1.concat(elements2);

let totalPriority1 = 0;
let totalPriority2 = 0;

input.forEach((rucksack) => {
  const firstCompartment = [...rucksack];
  const secondCompartment = firstCompartment.splice(0, rucksack.length / 2);

  let priority = 0;
  firstCompartment.some((element) => {
    if (secondCompartment.includes(element)) {
      priority = elements.indexOf(element, 0) + 1;
    }
  });
  totalPriority1 += priority;
});

const chunkSize = 3;
for (let i = 0; i < input.length; i += chunkSize) {
  const chunk = input.slice(i, i + chunkSize);
  const array = chunk.map((elf) => elf.split(""));
  const commonElement = [...new Set(array.reduce((a, b) => a.filter((c) => b.includes(c))))][0];

  totalPriority2 += elements.indexOf(commonElement, 0) + 1;
}

console.log(`1. ${totalPriority1} 2. ${totalPriority2}`);
