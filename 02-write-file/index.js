const fs = require('fs/promises')
const path = require('path')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

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

// async function wrtieTextInFile () {

// }


let data = ''
async function writeInFile () {
    try {
        // console.log(`YPA`)
        data = ' some text'
        await fs.writeFile(__dirname + '/text.txt', 'Greeting' + data, { flag: 'a+'})
        await readline.question('Hey ', greeting => {
            console.log(`${greeting}`)
            if (greeting == 'exit') {
                readline.close()
            } else {
                fs.writeFile(__dirname + '/text.txt', `${greeting}`, { flag: 'a+'})
            }
            
        })
        await readline.on('line', input => {
            if (input == 'exit') {
                readline.close()
            } else {
                fs.appendFile(__dirname + '/text.txt', ' ' + input, function (err) {
                    if (err) throw err
                })
            }
        })
        // await fs.writeFile(__dirname + '/text.txt', 'Greeting' + data, { flag: 'a+'})

        //await fs.readFile(__dirname + '/text.txt', 'utf8')
    } catch (error) {
        console.log(error)
    }
}

writeInFile()