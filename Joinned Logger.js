"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

function logger(msg) {
  ws.write(`${msg.text}\n`);
}

function joinedLogger(level, sep) {
  // write your code here
  return function f(...messages) {
    let str = "";
    messages.forEach((msg) => {
      if (msg.level >= level) {
        str = str + msg.text + sep;
      }
    });
    let len = sep.length;
    let strArray = str.split("");
    strArray.splice(strArray.length - len, len);
    str = strArray.join("");
    console.log({ str, messages, level, sep });
    fs.createWriteStream(process.env.OUTPUT_PATH).write(str);
    return;
  };
}

function main() {
  const firstLine = readLine().trim().split(" ");
  const level = parseInt(firstLine[0]);
  const sep = firstLine[1];
  const myLog = joinedLogger(level, sep);

  const n = parseInt(readLine().trim());
  let messages = [];
  for (let i = 0; i < n; ++i) {
    const line = readLine().trim().split(" ");
    const level = parseInt(line[0]);
    const text = line[1];
    messages.push({ level, text });
  }
  myLog(...messages);
  ws.end();
}
