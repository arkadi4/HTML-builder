const fs = require('fs')
const path = require('path')

//path.dirname(pathToTxt) + '/text.txt'
// const pathToTxt = './01-read-file/text.txt'
// const parentDir = path.dirname(pathToTxt)
// console.log('pathToTxt', pathToTxt)
// console.log('parentDir', __dirname)

fs.readFile(__dirname + '/text.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return
    } 
    console.log(data)
})

// console.log('YPA')