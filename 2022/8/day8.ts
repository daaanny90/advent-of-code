#! /usr/bin/env node
import fs from "fs";
type Forest = Array<Array<string>>;

const input: string = fs.readFileSync("test.txt").toString();

const arrayInputRaw = input.split("\n");
const arrayInput = arrayInputRaw.filter((el) => el !== "\n");
const trees: string[] = [];

const isLastOf = (array: Array<unknown>) => {
  return array.length - 1;
};

const isTreeVisibleInRow = (row: Array<string>, currentTree: number) => {
  const rowOfTrees = row.map((tree) => Number(tree) < Number(row[currentTree]));
  return rowOfTrees.some((isVisible) => isVisible);
};

function isTreeVisibleInColumn(forest: Forest, row: number, tree: number) {
  let sameOrBiggerTrees = 0;
  for (let currentRow = 0; currentRow < forest.length; currentRow++) {
    console.log(`Check row ${currentRow}`);

    if (currentRow !== row) {
      if (parseInt(forest[currentRow][tree]) > parseInt(forest[row][tree])) {
        console.log(
          `${forest[currentRow][tree]} is bigger than ${forest[row][tree]}`
        );

        sameOrBiggerTrees++;
      }
      return;
    }

    console.log(`Row is the same (${currentRow} and ${row}). Skip.`);
  }

  if (sameOrBiggerTrees === 0) {
    console.log(`${forest[row][tree]} is visible`);
    trees.push(forest[row][tree]);
  }

  return sameOrBiggerTrees === 0;
}

const isFirstOrLastRaw = (forest: Forest, row: number) =>
  row === 0 || row === isLastOf(forest);

const isFirstOrLastTreeInRaw = (forest: Forest, tree: number, row: number) =>
  tree === 0 || tree === isLastOf(forest[row]);

let forest: Forest = [];

for (let i = 0; i < arrayInput.length; i++) {
  let row = [...arrayInput[i]];
  forest.push(row);
}

let visibleTrees = 0;
let visibleTreesCenter = 0;
// let row = 0;
forest.forEach((row, rowNumber) => {
  if (row === undefined) {
    throw new Error("dsjkajdask");
  }

  if (isFirstOrLastRaw(forest, rowNumber)) {
    visibleTrees += row.length;
    return;
  }

  row.forEach((_, treeNumber) => {
    if (isFirstOrLastTreeInRaw(forest, treeNumber, rowNumber)) {
      visibleTrees++;
      return;
    }

    if (isTreeVisibleInRow(row, treeNumber)) {
      visibleTreesCenter++;
      return;
    }

    if (isTreeVisibleInColumn(forest, rowNumber, treeNumber)) {
      visibleTreesCenter++;
      return;
    }
  });
});

console.log(visibleTrees, visibleTreesCenter);
console.log(trees);
