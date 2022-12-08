#! /usr/bin/env node
import fs from "fs";
type Stacks = Array<Array<string>>;

const instructions: Array<string> = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n");

const input: Array<string> = instructions.splice(0, instructions.indexOf(""));
const columns = [...input[input.length - 1]].filter((el) => el !== " ").length;
input.length = columns;
instructions.shift();

const rotateArray = (array: Stacks) => {
  const rightStack: any = [];

  array.forEach((stack) => {
    for (let i = 0; i < stack.length; i++) {
      if (!rightStack[i]) {
        rightStack.push([]);
      }
      rightStack[i].push(stack[i]);
      rightStack[i] = rightStack[i].filter((el: string) => el != " ");
    }
  });

  return rightStack;
};

const crateMover = (
  stack: Stacks,
  info: RegExpMatchArray,
  craneType: 9000 | 9001
) => {
  let elementsToMove: Array<string> = [];
  const numberOfElements = parseInt(info[0]);
  const columnFrom = parseInt(info[1]) - 1;
  const columnTo = parseInt(info[2]) - 1;

  if (craneType === 9000) {
    for (let i = 0; i < numberOfElements; i++) {
      stack[columnTo]?.unshift(stack[columnFrom][0]);
      stack[columnFrom]?.splice(0, 1);
    }
    return;
  }

  for (let i = 0; i < numberOfElements; i++) {
    elementsToMove.push(stack[columnFrom][i]);
  }
  stack[columnTo]?.unshift(...elementsToMove);
  stack[columnFrom]?.splice(0, numberOfElements);
};

const checkTopCranes = (stack: Stacks) => {
  let part1 = "";
  stack.forEach((stack: Array<string>) => {
    part1 += stack[0];
  });
  return part1;
};

const stacksRaw = input.map((line) =>
  [...line].filter((_, index) => index % 4 === 1)
);
const stackPart1: Stacks = rotateArray(stacksRaw);
const stackPart2: Stacks = rotateArray(stacksRaw);

instructions.forEach((instruction) => {
  const info = instruction.match(/\d+/g);

  if (!info) {
    throw new Error("No info found");
  }
  if (info?.length < 3) {
    throw new Error("Not enough instructions given");
  }

  if (!stackPart1) {
    throw new Error("Stack is undefined.");
  }

  crateMover(stackPart1, info, 9000);
  crateMover(stackPart2, info, 9001);
});

let part1 = checkTopCranes(stackPart1);
let part2 = checkTopCranes(stackPart2);

console.log(`1. ${part1} 2. ${part2}`);
