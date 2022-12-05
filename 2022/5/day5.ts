#! /usr/bin/env node
import fs from "fs";

const input: Array<string> = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n");
