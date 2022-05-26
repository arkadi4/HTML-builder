// const fs = require('fs/promises')
// const path = require('path')

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// async function writeInFile (input) {
//     try {
//         console.log(`YPA_${input}`)
//         await fs.writeFile(__dirname + '/text.txt', input)
//         await readline.question('Hey', greeting => {
//             console.log(`${greeting}`)
//         })
//         await fs.readFile(__dirname + '/text.txt', 'utf8')
//     } catch (error) {
//         console.log(error)
//     }
// }

// writeInFile('aga')




// const fs = require('fs');
// const path = require('path');
// const file = path.join(__dirname, 'text.txt');
// const process = require('process');
// const readline = require('readline');
// const rl = readline.createInterface(process.stdin, process.stdout);

// rl.question('hello:) ', (answer) => {
  
//   if(answer === 'exit') {
//     rl.close();
//   } else {
//     fs.writeFile(file, 'hello:) ' + '\n' + answer, function (err) {
//       if (err) throw err;
//     });
//   }
// });

// rl.on('line', (input) => {
//   if(input === 'exit') {
//     rl.close();
//   } else {
//     fs.appendFile(file, '\n'+ input, function (err) {
//       if (err) throw err;
//     });
//   }
// });


// process.on('beforeExit', () => {
//   console.log('Thank you!');
// });





// async function wrtieTextInFile () {

// }


// let data = ''
// async function writeInFile () {
//     try {
//         // console.log(`YPA`)
//         data = ' some text'
//         await fs.writeFile(__dirname + '/text.txt', 'Greeting' + data, { flag: 'a+'})
//         await readline.question('Hey ', greeting => {
//             console.log(`${greeting}`)
//             if (greeting == 'exit') {
//                 readline.close()
//             } else {
//                 fs.writeFile(__dirname + '/text.txt', `${greeting}`, { flag: 'a+'})
//             }
            
//         })
//         await readline.on('line', input => {
//             if (input == 'exit') {
//                 readline.close()
//             } else {
//                 fs.appendFile(__dirname + '/text.txt', ' ' + input, function (err) {
//                     if (err) throw err
//                 })
//             }
//         })
//         // await fs.writeFile(__dirname + '/text.txt', 'Greeting' + data, { flag: 'a+'})

//         //await fs.readFile(__dirname + '/text.txt', 'utf8')
//     } catch (error) {
//         console.log(error)
//     }
// }

// writeInFile()





// const fs = require('fs');
// const path = require('path');

// let pathJoin = path.join(__dirname, 'text.txt');

// const output = fs.createWriteStream(pathJoin);

// const { stdin, stdout } = process;

// stdout.write('Hello! Write something...\n');

// stdin.on('data', (data) => {
//   data = data.toString();
//   if (data.trim() !== 'exit') {
//     output.write(data);
//   } else {
//     process.exit();
//   }
// });

// process.on('SIGINT', () => {
//   process.exit();
// });

// process.on('exit', () => stdout.write('Good bye!'));

const fs = require('fs')
const path = require('path')
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');
const rl = readline.createInterface({ input, output });
// { flags: 'a'}
const pathToText = path.join(__dirname, 'text.txt')
const writeStream = fs.createWriteStream(pathToText)
console.log('HEY')
// writeStream.write('HEY')
// writeStream.write()
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
// writeStream.on('data', (chunk) => {
//     if (err) throw err
//     console.log("HEY")
//     readline.question('Write smth', (answer) => {
//         chunk.write(answer)
//     })
// })