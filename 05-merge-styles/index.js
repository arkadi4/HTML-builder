const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

async function makeBundle () {
  const pathToFolder = path.join(__dirname, 'styles');  
  const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css');
  const filesInFolder =  await fsPromise.readdir(pathToFolder);
  let writeStream = fs.createWriteStream(pathToBundle);
  for (let file of filesInFolder ) {
    if (path.extname(file) === '.css') {
      let pathToFile = path.join(pathToFolder, file);
      fs.createReadStream(pathToFile, 'utf8').on('data',  (chunk) => {              
        writeStream.write(chunk);
      });
    }
  }
}
makeBundle();