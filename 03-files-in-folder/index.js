const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const pathToFolder = path.join(__dirname, 'secret-folder');
async function readSecretFolder () {
  try {
    const filesInFolder =  await fsPromise.readdir(pathToFolder, { withFileTypes: true});
    for ( let file of filesInFolder ) {
      if (file.isFile()) {
        let pathToFile = path.join(pathToFolder, file.name);
        fs.stat(pathToFile, (error, stat) => {
          if (error) {console.log(error);}
          console.log(`${path.parse((file.name)).name} - ${path.extname((file.name)).slice(1)} - ${stat.size/1024}kb`);
        });
      }
    }
  } catch (error) {
    console.error('there was an error:', error.message);
  }
}
readSecretFolder();
