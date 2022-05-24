const { readdir, Dirent } = require('fs')
const fsPromise = require('fs/promises')
const fs = require('fs')
const path = require('path')

const pathToFolder = path.join(__dirname, 'secret-folder')

let files

async function readFolder () {
    files = await fsPromise.readdir(pathToFolder, {withFileTypes: true})
    console.log('files', files)
    for (let file of files) {
        if (file.isFile()) {
            let ext = path.extname(file.name)
            console.log(ext)
            let pathForStat = path.join(pathToFolder, file.name)
            // let stats = await fs.stat(pathForStat, s)
            // console.log(stats)
            fs.stat(pathForStat, (err, stats) => {
                if (err) throw err;
                //console.log(stats)
                console.log(`${file.name} ${(stats.size/1024)}kb\n`);
            })
        }
    }
}
readFolder()
// console.log('files', files)
// console.log( await fsPromise.readdir(pathToFolder))