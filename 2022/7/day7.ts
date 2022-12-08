#! /usr/bin/env node
import fs from "fs";

const input: Array<string> = fs
  .readFileSync("test.txt")
  .toString()
  .split("\n");

  console.log(input)