// const { readdir, Dirent } = require('fs')
// const fsPromise = require('fs/promises')
// const fs = require('fs')
// const path = require('path')

// const pathToFolder = path.join(__dirname, 'secret-folder')

// let files

// async function readFolder () {
//     files = await fsPromise.readdir(pathToFolder, {withFileTypes: true})
//     console.log('files', files)
//     for (let file of files) {
//         if (file.isFile()) {
//             let ext = path.extname(file.name)
//             console.log(ext)
//             let pathForStat = path.join(pathToFolder, file.name)
//             // let stats = await fs.stat(pathForStat, s)
//             // console.log(stats)
//             fs.stat(pathForStat, (err, stats) => {
//                 if (err) throw err;
//                 //console.log(stats)
//                 console.log(`${file.name} ${(stats.size/1024)}kb\n`);
//             })
//         }
//     }
// }
// readFolder()
// console.log('files', files)
// console.log( await fsPromise.readdir(pathToFolder))

// const fs = require('fs/promises');
// const path = require('path');
// const folderPath = path.join(__dirname, 'secret-folder');

// async function readFiles(folderPath) {
//   const files = await fs.readdir(folderPath, {withFileTypes: true});
//   for (const dirent of files) {
//     if(dirent.isFile()) {
//       let ext = path.extname(dirent.name);
//       let name = path.basename(dirent.name, ext);
//       let parse = await fs.stat(path.resolve(folderPath, dirent.name));
//       console.log(`${name} - ${ext.slice(1)} - ${parse.size/1024}kb`);
//     }
//   }
// }

// readFiles(folderPath);



// const path = require('path');
// const fs = require('fs');
// const { readdir } = require('fs/promises');

// let pathJoin = path.join(__dirname, 'secret-folder');

// async function getInfo(pathFolder) {
//   try {
//     const files = await readdir(pathFolder, { withFileTypes: true });
//     for (const file of files) {
//       if (file.isFile()) {
//         let pathFile = path.join(pathFolder, file.name);
//         fs.stat(pathFile, (error, stat) => {
//           if (error) {
//             console.log(error.message);
//           } else {
//             let fileParseInfo = path.parse(pathFile);
//             let fileInfo = `${fileParseInfo.name} - ${fileParseInfo.ext.slice(
//               1
//             )} - ${stat.size / 1024}kb`;
//             console.log(fileInfo);
//           }
//         });
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// getInfo(pathJoin);




// const fs = require('fs');
// const path = require('path');
// const dir = 'secret-folder';
// const folderPath = path.join(__dirname, dir);
// const { stdout, stderr } = require('process');
// const { promises: fsP } = require('fs');

// (async function getFiles(err) {
//   try {
//     const entries = await fsP.readdir(folderPath, { withFileTypes: true });
//     const files = entries.filter((file) => !file.isDirectory());
//     for (let file of files) printFileData(file);
//   } catch {
//     stderr.write(`${err}`);
//   }
// })();

// const printFileData = (file) => {
//   const srcFile = path.join(__dirname, dir, file.name);

//   fs.stat(srcFile, (err, stats) => {
//     if (err) stderr.write(`${err}`);
//     else if (stats.isFile) {
//       let extensio = path.extname(srcFile).slice(1);
//       let data = `${file.name} - ${extensio} - ${stats.size / 1024}kb`;
//       stdout.write(data + '\r\n');
//     }
//   });
// };



const fs = require('fs')
const fsPromise = require('fs/promises')
const path = require('path')

const pathToFolder = path.join(__dirname, 'secret-folder')
async function readSecretFolder () {
    try {
        const filesInFolder =  await fsPromise.readdir(pathToFolder, { withFileTypes: true})
        console.log( filesInFolder)
        for (file of filesInFolder ) {
            // console.log(file)
            if (file.isFile()) {
                pathToFile = path.join(pathToFolder, file.name)
                fs.stat(pathToFile, (error, stat) => {
                    if (error) {console.log(error)}
                    // console.log(stat)
                    console.log(`${path.parse((file.name)).name} - ${path.extname((file.name)).slice(1)} - ${stat.size/1024}`)
                })
                // console.log(fs.stat(file))
                
            }
        }
    } catch (error) {
        console.error('there was an error:', error.message);
    }
}
readSecretFolder()
