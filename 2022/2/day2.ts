#! /usr/bin/env node
import fs from "fs";

const input: Array<string> = fs.readFileSync("i.txt").toString().split("\n");
const array: Array<Array<string>> = input.map((entry) => entry.split("\n"));

const iUseRock =(points: number) => points + 1;
const iUsePaper = (points: number) => points + 2;
const iUeScissors = (points :number) => points + 3;

const part1 = (player: string, me: string) => {
  let points = 0;
  const rock1 = "A",
    paper1 = "B",
    scissors1 = "C",
    rock = "X",
    paper = "Y",
    scissors = "Z";

  switch (me) {
    case rock:
      points = iUseRock(points);
      if (player === scissors) { points = points + 6 };
      if (player === rock1) { points = points + 3 };
      break;
    case paper:
      points = iUsePaper(points);
      if (player === rock1) { points = points + 6 };
      if (player === scissors1) { points = points + 3 };
      break;
    case scissors:
      points = iUeScissors(points);
      if (player === paper1) { points = points + 6 };
      if (player === scissors1) { points = points + 3 };
      break;
  }
  return points;
};

const part2 = (player: string, result: string) => {
  let points = 0;
  const rock = "A",
    paper = "B",
    scissors = "C",
    lose = "X",
    draw = "Y",
    win = "Z";

  if (result === lose) {
    switch (player) {
      case rock:
        points = iUeScissors(points); 
        break;
      case paper:
        points = iUseRock(points);
        break;
      case scissors:
       points = iUsePaper(points);
       break; 
      default:
        break;
    }
  }

  if (result === draw) {
    points = points + 3;
    switch (player) {
      case rock:
        points = iUseRock(points);
        break;
      case paper:
        points = iUsePaper(points);
        break;
      case scissors:
        points = iUeScissors(points);
        break;
    }
  }

    if (result === win) {
      points = points + 6;
      switch (player) {
        case rock:
          points = iUsePaper(points);
          break;
        case paper:
          points = iUeScissors(points);
          break;
        case scissors:
          points = iUseRock(points);
          break;
      }
    }

  return points;
};

let resutlPart1 = 0;
let resutlPart2= 0;

array.map((game) => {
  let gamePointsPart1 = 0;
  let gamePointsPart2 = 0;

  gamePointsPart1 = part1(game[0][0], game[0][2]);
  gamePointsPart2 = part2(game[0][0], game[0][2]);

  resutlPart1 = resutlPart1 + gamePointsPart1;
  resutlPart2 = resutlPart2 + gamePointsPart2;
});

console.log(`1. ${resutlPart1} 2. ${resutlPart2}`);
