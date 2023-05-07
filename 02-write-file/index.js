const process = require('process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('Hello, write something');
const pathToTextFile = path.join(__dirname, 'textFile.txt');
const writeStreamToFile = fs.createWriteStream(pathToTextFile);

const rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', (input) => {
  // console.log(input);
  if (input === 'exit') {
    console.log('have a good day');
    rl.close();
  } else {
    writeStreamToFile.write(`${input}\n`);
  }
});
rl.on('close', () => {
  console.log('have a good day');
});
