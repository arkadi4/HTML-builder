const fs = require('fs')
const path = require('path')

const pathToText = path.join(__dirname, 'text.txt')

const readStream = fs.createReadStream(pathToText)
readStream.on('data', chunk => console.log(chunk.toString()))