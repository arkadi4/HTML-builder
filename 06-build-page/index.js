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
      // console.log('tagName', tagName, tagName[0]);
      let pathToComponentFile = path.join(__dirname, 'components', `${tagName[0]}.html`);
      console.log('pathToComponentFile', pathToComponentFile);
      let componentData = await fsPromise.readFile(pathToComponentFile, {encoding: 'utf-8'});
      // console.log('componentData', componentData);
      console.log('matchLine', matchLine);
      // templateDataWithReplacements.replace(matchLine, componentData);
      templateDataWithReplacements = templateDataWithReplacements.replace(matchLine, componentData);
      console.log('templateData', templateDataWithReplacements);
    }
    await fsPromise.writeFile(pathToProjectDistIndexHtml, templateDataWithReplacements);
  } catch (error) {
    console.error(error);
  }
};
asyncReadTemplate();



// const readTempData = async () => {
//   try {
//     await asyncReadTemplate();
//     console.log('tempData', typeof tempData);
//   } catch (error) {
//     console.error(error);
//   }
// };
// readTempData();

// const pathToProjectDistIndexHtml = path.join(__dirname, 'project-dist', 'index.html');

// const readFromTemplate = fs.createReadStream(pathToTemplate);
// const writeToHtmlStream = fs.createWriteStream(pathToProjectDistIndexHtml);
// const rl = readline.createInterface(readFromTemplate);

// let templateData;
// fs.readFile(pathToTemplate, {encoding: 'utf-8'}, (error, data) => {
//   try {
//     templateData = data;
//     console.log('templateData', templateData);
//     let matchLineArray = templateData.match(/{{\w{1,}}}/g);
//     console.log('matchLine', matchLineArray);
//     for (let matchLine of matchLineArray) {
//       let tagName = matchLine.match(/\w{1,}/);
//       console.log('tagName', tagName, tagName[0]);
//       let pathToComponentFile = path.join(__dirname, 'components', `${tagName[0]}.html`);
//       console.log('pathToComponentFile', pathToComponentFile);
//       fs.readFile(pathToComponentFile, {encoding: 'utf-8'}, (componentData, error) => {
//         try {
//           console.log('componentData', componentData);
//         } catch {
//           console.log(error);
//         }
//       });
//     }
// if (matchLine) {
// let tagName = matchLine.match(/\w{1,}/);
// console.log('matchLine', matchLine, matchLine[0]);
// console.log('tagName', tagName, tagName[0]);
// let pathToComponentFile = path.join(__dirname, 'components', `${tagName[0]}.html`);
// console.log('pathToComponentFile', pathToComponentFile);
// let readStreamFromComponent = fs.createReadStream(pathToComponentFile);
// readStreamFromComponent.on('data', chunk => {
//   // writeToHtmlStream.write(chunk);
//   console.log('chunk', chunk.toString());
// });
// } else {
// writeToHtmlStream.write(`${line}\n`);
// console.log('line', line);
// }
//   } catch {
//     console.error(error);
//   }
// });

// const asyncFindTagNames = async () => {
//   await console.log('templateData', templateData);
// };
// asyncFindTagNames();






// let templateData;
// const asyncReadFromTemplate = async () => {
//   try {
//     let templateData = await fsPromise.readFile(pathToTemplate, {encoding: 'utf-8'});
//     console.log('templateData in func', templateData);
//     return templateData;
//   } catch (err) {
//     console.error(err);
//   }
// };
// asyncReadFromTemplate();

// rl.on('line', (line) => {
//   // console.log('line', line);
//   // if (line.includes('{{')) {
//   //   console.log('YPPPPPPPPPPPPPPPPPPPPPPPPPPPA');
//   // }
//   let matchLine = line.match(/{{\w{1,}}}/);
//   if (matchLine) {
//     let tagName = line.match(/\w{1,}/);
//     // console.log('matchLine', matchLine, matchLine[0]);
//     // console.log('tagName', tagName, tagName[0]);
//     let pathToComponentFile = path.join(__dirname, 'components', `${tagName[0]}.html`);
//     // console.log('pathToComponentFile', pathToComponentFile);
//     let readStreamFromComponent = fs.createReadStream(pathToComponentFile);
//     readStreamFromComponent.on('data', chunk => {
//       writeToHtmlStream.write(chunk);
//       console.log('chunk', chunk.toString());
//     });
//   } else {
//     writeToHtmlStream.write(`${line}\n`);
//     console.log('line', line);
//   }
// });