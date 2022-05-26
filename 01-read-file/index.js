// const fs = require('fs')
// const path = require('path')

// //path.dirname(pathToTxt) + '/text.txt'
// // const pathToTxt = './01-read-file/text.txt'
// // const parentDir = path.dirname(pathToTxt)
// // console.log('pathToTxt', pathToTxt)
// // console.log('parentDir', __dirname)

// fs.readFile(__dirname + '/text.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.log(err);
//         return
//     } 
//     console.log(data)
// })

// console.log('YPA')

// const fs = require('fs');
// const path = require('path');
// const file = path.join(__dirname, 'text.txt');
// const stream = new fs.ReadStream(file,'utf8');

// stream.on('data', function(data){
//   console.log(data);
// });



// const fs = require('fs');
// const path = require('path');

// let pathJoin = path.join(__dirname, 'text.txt');

// const readableStream = fs.createReadStream(pathJoin, 'utf-8');
// readableStream.on('data', (chunk) => console.log(chunk));


const fs = require('fs')
const path = require('path')

const pathToText = path.join(__dirname, 'text.txt')

const readStream = fs.createReadStream(pathToText)
readStream.on('data', chunk => console.log(chunk.toString()))