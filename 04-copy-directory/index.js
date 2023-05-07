const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

async function copyDir () {
  const pathToFolder = path.join(__dirname, 'files');
  const pathToCopyFolder = path.join(__dirname, 'files-copy');
  fs.mkdir(pathToCopyFolder, { recursive: true}, (err) => {
    if (err) throw err;
  });
  const filesInFolder =  await fsPromise.readdir(pathToFolder);
  for ( let file of filesInFolder ) {
    try {
      await fsPromise.copyFile(path.join(pathToFolder, file), path.join(pathToCopyFolder, file));
    } catch {
      console.error('Error');
    }
  }
}
copyDir();