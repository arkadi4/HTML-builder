
// const fs = require('fs/promises');
// const path = require('path');
// const folderPath = path.join(__dirname, 'files');
// const folderPathCopy = path.join(__dirname, 'files-copy');

// async function copyFiles (folder, folderCopy) {
//   await fs.rm(folderCopy, { recursive: true, force: true });
//   await fs.mkdir(folderCopy, { recursive: true });

//   const files = await fs.readdir(folder);

//   for (const file of files) {
//     let pars = await fs.stat(path.resolve(folder, file));
//     if (pars.isFile()) {
//       await fs.copyFile(path.join(folder, file), path.join(folderCopy, file));
//     }
//     if (pars.isDirectory()) {
//       await copyFiles(path.join(folder, file), path.join(folderCopy, file));
//     }
//   }
// }

// copyFiles(folderPath, folderPathCopy);


// const { rm, mkdir, readdir, copyFile } = require('fs/promises');
// const path = require('path');

// const folderPath = path.join(__dirname, 'files');
// const copyFolderPath = path.join(__dirname, 'files-copy');

// async function copyFiles() {
//   try {
//     await rm(copyFolderPath, { recursive: true, force: true });
//     await mkdir(copyFolderPath, { recursive: true });

//     let files = await readdir(folderPath, { withFileTypes: true });

//     for (let file of files) {
//       let pathToFile = path.join(folderPath, file.name);
//       let pathToCopyFile = path.join(copyFolderPath, file.name);

//       if (!file.isDirectory()) {
//         await copyFile(pathToFile, pathToCopyFile);
//       } else {
//         copyFiles(pathToFile, pathToCopyFile);
//       }
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// copyFiles();




// const { promises: fs } = require('fs');
// const path = require('path');
// const { stderr } = require('process');

// const srcDr = path.join(__dirname, 'files');
// const destDr = path.join(__dirname, 'files-copy');

// async function copyDir(srcDr, destDr) {
//   try {
//     await fs.mkdir(destDr, { recursive: true });
//     let entries = await fs.readdir(srcDr, {
//       withFileTypes: true,
//     });

//     for (let file of entries) {
//       let srcPath = path.join(srcDr, file.name);
//       let destPath = path.join(destDr, file.name);

//       file.isDirectory()
//         ? await copyDir(srcPath, destPath)
//         : await fs.copyFile(srcPath, destPath);
//     }
//   } catch (err) {
//     stderr.write(`${err}`);
//   }
// }

// copyDir(srcDr, destDr);




const fs = require('fs')
const fsPromise = require('fs/promises')
const path = require('path')

async function copyDir () {
    const pathToFolder = path.join(__dirname, 'files')
    const pathToCopyFolder = path.join(__dirname, 'files-copy')
    // console.log(__dirname)
    fs.mkdir(pathToCopyFolder, { recursive: true}, (err) => {
        if (err) throw err
    })
    const filesInFolder =  await fsPromise.readdir(pathToFolder)
    console.log( filesInFolder)
    for (file of filesInFolder ) {
        console.log(path.join(pathToFolder,file))
        fs.copyFile(path.join(pathToFolder,file), path.join(pathToCopyFolder,file), () => {})

    }
}
copyDir()