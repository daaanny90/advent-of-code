#! /usr/bin/env node
import fs from "fs";

const input: Array<string> = fs
  .readFileSync("test.txt")
  .toString()
  .split("\n");

let crates = input.slice(0, input.indexOf(""));

const instructions = input.slice(input.indexOf("") + 1, -1)
console.log(crates, instructions)