#! /usr/bin/env node
import fs from "fs";
type Directory = {
  index: number;
  name: string;
  files: Array<string>;
  totalSize: number;
  subFolders: Array<string>;
};

const input: Array<string> = fs.readFileSync("input.txt").toString().split("\n");

let counter = 0;
const directories: Array<Directory> = [];

const isCdCommand = (entry: string): RegExpMatchArray | null => {
  return entry.match(/[$cd ]{5}/g);
};

const isDirectory = (entry: string): RegExpMatchArray | null => {
  return entry.match(/[dir ]{4}/g);
};

const prefixName = (dir: string, index: number, prefix: string) => {
  const dirName = isDirectory(dir);
  if (dirName) {
    input[index] = `dir ${prefix + dir.replace(dirName[0], "")}`;
  }
}

const prefixCommand = (command: string, index: number, prefix: string) => {
  const commandName = isCdCommand(command)
  if (commandName) {
    input[index] = `$ cd ${prefix + command.replace(commandName[0], "")}`
  }
}

const isFile = (entry: string): RegExpMatchArray | null => {
  return entry.match(/([\d+])+/);
};

let currentDir = "";
let dirList: Array<string> = [];
let levelIndex = -1;
let i = 0;
// prepare input with prefixes to avoid duplicated directories
input.forEach((entry) => {
  if (isCdCommand(entry) && entry !== "$ cd ..") {
    const commandCd = isCdCommand(entry);
    if (!commandCd) {
      throw new Error(`${entry} is not a cd command.`);
    }
    // save current position in array
    currentDir = entry.replace(commandCd[0], "");
    dirList.push(currentDir);
    
    // increase index to match the current position
    levelIndex++;

    // on root level is useless put prefixes
    if (levelIndex > 1) {

      // prefix the command to match the prefixed folder name
      prefixCommand(entry, i, `${dirList[levelIndex - 1]}_`);
    }
  }

  if (isDirectory(entry)) {
    // do not apply prefixes on root level
    if (levelIndex !== 0) {
      prefixName(entry, i, `${dirList[levelIndex]}_`);
    }
  }

  if (entry === "$ cd ..") {
    levelIndex--
  }
  i++
});

// build list of directories
input.forEach((entry) => {
  // if command is cd then parse the directory
  if (isCdCommand(entry) && entry !== "$ cd ..") {
    // save current directory
    const commandCd = isCdCommand(entry);
    if (!commandCd) {
      throw new Error(`${entry} is not a cd command.`);
    }

    let dir: Directory = {
      index: counter,
      name: "",
      files: [],
      totalSize: 0,
      subFolders: [],
    };

    dir.name = entry.replace(commandCd[0], "");

    // calculate total size of current directory based on the files inside
    for (let i = counter + 2; i < input.length; i++) {
      if (isFile(input[i])) {
        const fileSize = isFile(input[i]);
        if (fileSize) {
          dir.totalSize += parseInt(fileSize[0]);
        }
        dir.files.push(input[i]);
      }

      // populate the list of subfolders inside current directory
      if (isDirectory(input[i])) {
        const dirName = isDirectory(input[i]);
        if (dirName) {
          dir.subFolders.push(input[i].replace(dirName[0], ""));
        }
      }

      // if switching to anoher directory of the end is reached, break the loop and go on
      if (isCdCommand(input[i]) || input[i] === input[input.length - 1]) {
        if (input[i] === "$ cd ..") {
          levelIndex--;
        }
        directories.push(dir);
        break;
      }
    }
  }
  counter++;
});

const calcTotalSize = (dir: Directory) => {
 dir.subFolders.forEach((sub) => {
    directories.forEach((entry) => {
      if (entry.name === sub) {
        dir.totalSize += entry.totalSize;
        if (entry.subFolders.length > 0) {
          calcTotalSize(entry)
        }
        return;
      }
    }); 
  })
};

const root = directories[0]  
calcTotalSize(root)

let part1 = 0;
directories.forEach((dir) => {
  if (dir.totalSize <= 100000) {
    part1 += dir.totalSize;
  }
});

console.log(directories);
console.log(input)

if (part1 === 1314546 || part1 === 1314661 || part1 === 1316024) {
  console.log(`${part1} is wrong`);
} else {
  console.log(`1. ${part1}`);
}