import fs from "fs";
type Command = {
  type: "command";
  command: "cd" | "ls";
  arg?: string;
};

type File = {
  type: "file";
  size: number;
  name: string;
};

type Dir = {
  type: "dir";
  size: null;
  name: string;
};

type Entries = (Command | File | Dir)[];

type Disk = {
  [key: string]: Disk | number;
};

const input: string = fs
  .readFileSync("input.txt")
  .toString()
  
const parseCommands = (entries: Entries) => {
  const disk: Disk = {};
  const path: string[] = [];

  const createFileOrDir = (name: string, val: number | {} = {}) => {
    // const p = [...path];
    let cwd = disk;

    path.forEach((step) => {
      if (cwd[step] === undefined) {
        cwd[step] = {} as Disk;
      }
      cwd = cwd[step] as Disk;
    });

    cwd[name] = val;
  };

  for (const entry of entries) {
    switch (entry.type) {
      case "command": {
        switch (entry.command) {
          case "ls":
            break;
          case "cd":
            if (entry.arg === "..") {
              path.pop();
            } else if (entry.arg === "/") {
              path.length = 0;
            } else {
              path.push(entry.arg as string);
            }
            break;
        }
        break;
      }

      case "dir": {
        createFileOrDir(entry.name);
        break;
      }

      case "file": {
        createFileOrDir(entry.name, entry.size);
        break;
      }
    }
  }

  return disk;
};


const parseInput = (input: string) => {
  const entries = input.split("\n").map((line) => {
    if (line.startsWith("$")) {
      const [command, arg] = line.split(" ").slice(1);
      return { type: "command", command, arg } as Command;
    }

    const [dirOrSize, name] = line.split(" ");

    if (dirOrSize === "dir") {
      return {
        type: "dir",
        name,
      } as Dir;
    }

    return {
      type: "file",
      size: Number(dirOrSize),
      name,
    } as File;
  });

  return parseCommands(entries);
};

const getDirSizes = (inputFile: string) => {
  const input = parseInput(inputFile);
  const dirSizes: number[] = [];

  const recur = (disk: Disk) => {
    let size = 0;

    for (const [_, val] of Object.entries(disk)) {
      size += typeof val === "number" ? val : recur(val);
    }

    dirSizes.push(size);
    return size;
  };

  recur(input);
  return dirSizes;
};

const getBiggestDir = (input: string): number => {
  return getDirSizes(input)
  .filter((size) => size <= 100000)
  .reduce((a, b) => a + b, 0);
};
let part1 = getBiggestDir(input);

const minDirSize = (input: string): number | undefined => {
  const dirSizes = getDirSizes(input).sort((a, b) => a - b);
  const free = 70_000_000 - (dirSizes.at(-1) ?? 0);
  const required = 30_000_000 - free;

  return dirSizes.find((size) => size >= required);
};
let part2 = minDirSize(input)

console.log(`1. ${part1} 2. ${part2}`)