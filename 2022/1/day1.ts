#! /usr/bin/env node
import fs from "fs";

const input: Array<string> = fs
  .readFileSync("i.txt")
  .toString()
  .split("\n\n");

const sum = (a: number, b: number): number => a + b;
const array: Array<Array<number>> = input.map(entry => entry.split('\n').map(Number));
const totalEachElf: Array<number> = array.map(elf => elf.reduce(sum, 0));
const top3: number = totalEachElf.sort((a, b) => b - a).slice(0, 3).reduce(sum, 0);

console.log(`
1. ${Math.max(...totalEachElf)}
2. ${top3}`
)