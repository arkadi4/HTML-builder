const fs = require('node:fs');
const fsPromise = require('fs/promises');
// const readline = require('readline');
const path = require('path');

const pathToProjectDistFolder = path.join(__dirname, 'project-dist');
fs.mkdir(pathToProjectDistFolder, { recursive: true}, (err) => {
  if (err) throw err;
});
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToProjectDistIndexHtml = path.join(__dirname, 'project-dist', 'index.html');
let templateData;
const asyncReadTemplate = async () => {
  try {
    templateData = await fsPromise.readFile(pathToTemplate, {encoding: 'utf-8'});
    let matchLineArray = templateData.match(/{{\w{1,}}}/g);
    // console.log('matchLineArray', matchLineArray);
    let templateDataWithReplacements = templateData;
    for (let matchLine of matchLineArray) {
      let tagName = matchLine.match(/\w{1,}/);
      let pathToComponentFile = path.join(__dirname, 'components', `${tagName[0]}.html`);
      let componentData = await fsPromise.readFile(pathToComponentFile, {encoding: 'utf-8'});
      templateDataWithReplacements = templateDataWithReplacements.replace(matchLine, componentData);
    }
    await fsPromise.writeFile(pathToProjectDistIndexHtml, templateDataWithReplacements);
  } catch (error) {
    console.error(error);
  }
};
asyncReadTemplate();

async function makeBundle () {
  const pathToFolder = path.join(__dirname, 'styles');  
  const pathToBundle = path.join(__dirname, 'project-dist', 'style.css');
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

async function copyDir () {
  const pathToFolder = path.join(__dirname, 'assets');
  const pathToCopyFolder = path.join(__dirname, 'project-dist', 'assets');
  fs.mkdir(pathToCopyFolder, { recursive: true}, (err) => {
    if (err) throw err;
  });
  const foldersInFolder =  await fsPromise.readdir(pathToFolder);
  for (let folder of foldersInFolder) {
    let pathToCopyAssetsFolder = path.join(pathToCopyFolder, folder);
    fs.mkdir(pathToCopyAssetsFolder, { recursive: true}, (err) => {
      if (err) throw err;
    });
    let pathToFolderInAssetsFolder = path.join(pathToFolder, folder);
    let filesInFolder = await fsPromise.readdir(pathToFolderInAssetsFolder);
    for (let file of filesInFolder) {
      try {
        await fsPromise.copyFile(path.join(pathToFolderInAssetsFolder, file), path.join(pathToCopyAssetsFolder, file));
      } catch (error) {
        console.error('Error');
      }
    }
  }
}
copyDir();
