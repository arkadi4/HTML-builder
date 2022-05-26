const fs = require('fs')
const path = require('path')
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');
const rl = readline.createInterface({ input, output });
const pathToText = path.join(__dirname, 'text.txt')
const writeStream = fs.createWriteStream(pathToText)
console.log('HEY')

rl.question('Write smth \n', (answer) => {
    writeStream.write(`${answer}`)
})
rl.on('line', (xxx) => {
    if (xxx == 'exit') {
        rl.close()
    } else {
        writeStream.write('\n' + `${xxx}`)
    }
})
rl.on('close', () => {
    console.log("BYE")
})