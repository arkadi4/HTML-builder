// const fs = require('fs');
// const path = require('path');
// const fsProm = require('fs/promises');

// const stylesPath = path.join(__dirname, 'styles');
// const projectStylesPath = path.join(__dirname, 'project-dist', 'style.css');
// const assetsPath = path.join(__dirname, 'assets');
// const projectAssetsPath = path.join(__dirname, 'project-dist', 'assets');

// async function copyFiles (folder, folderCopy) {
//   await fsProm.rm(folderCopy, { recursive: true, force: true });
//   await fsProm.mkdir(folderCopy, { recursive: true });
//   const files = await fsProm.readdir(folder);

//   for (const file of files) {
//     let pars = await fsProm.stat(path.resolve(folder, file));
//     if (pars.isFile()) {
//       await fsProm.copyFile(path.join(folder, file), path.join(folderCopy, file));
//     }
//     if (pars.isDirectory()) {
//       await copyFiles(path.join(folder, file), path.join(folderCopy, file));
//     }
//   }
// }

// async function mergeCSS () {
//   const files = await fsProm.readdir(stylesPath);
//   let writeStream = fs.createWriteStream(projectStylesPath);

//   for (const file of files) {
//     if (path.extname(file) === '.css') {
//       let filePath = path.join(__dirname, 'styles', file);
//       let stream = fs.createReadStream(filePath,'utf8');
  
//       stream.on('data', (data) => {
//         writeStream.write(data);
//       });
//     }
//   }
// }

// async function buildPage (data) {
//   let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
//   writeStream.write(data);
// }

// async function copyHTML () {
//   const templatePageSrc = path.join(__dirname, 'template.html');
//   let tempPageStream = fs.createReadStream(templatePageSrc,'utf8');
//   let tempContent = '';
//   const componentsSrc = path.join(__dirname, 'components');
//   const files = await fsProm.readdir(componentsSrc);

//   tempPageStream.on('data', async (data) => {
//     tempContent = data;
//     for (const file of files) {
//       let content = '';
//       let ext = path.extname(file);
//       let name = path.basename(file, ext);
//       let newPath = path.join(componentsSrc, file);

//       if (ext === '.html') {
//         const pattern = new RegExp(`{{${name}}}`, 'g');
//         content = await fsProm.readFile(newPath,'utf8');
//         tempContent = tempContent.replace(pattern, content);
//       }
//     }
//     buildPage(tempContent);
//   });
// }

// async function buildProject () {
//   await copyFiles(assetsPath, projectAssetsPath);
//   await mergeCSS();
//   await copyHTML();
// }

// buildProject();




// const path = require('path');
// const {
//   rm,
//   mkdir,
//   readdir,
//   copyFile,
//   readFile,
//   writeFile,
// } = require('fs/promises');
// const fs = require('fs');

// const pathProjectDist = path.join(__dirname, 'project-dist');
// const pathComponents = path.join(__dirname, 'components');
// const pathAssets = path.join(__dirname, 'assets');
// const pathStyles = path.join(__dirname, 'styles');
// const pathTemplateHtml = path.join(__dirname, 'template.html');

// fs.access(pathProjectDist, async (error) => {
//   if (error) {
//     await mkdir(pathProjectDist);
//     buildPage();
//   } else {
//     await rm(pathProjectDist, { recursive: true, force: true });
//     await mkdir(pathProjectDist, { recursive: true });
//     buildPage();
//   }
// });

// async function createHtmlMarkup() {
//   try {
//     let templateHtmlFile = await readFile(pathTemplateHtml);
//     templateHtmlFile = templateHtmlFile.toString();

//     const htmlComponents = await readdir(pathComponents, {
//       withFileTypes: true,
//     });

//     for (let component of htmlComponents) {
//       let componentHtmlFile = await readFile(
//         path.join(pathComponents, component.name)
//       );
//       let componentName = path.basename(
//         path.join(pathComponents, component.name),
//         '.html'
//       );
//       templateHtmlFile = templateHtmlFile.replace(
//         `    {{${componentName}}}`,
//         componentHtmlFile.toString()
//       );
//     }

//     writeFile(path.join(pathProjectDist, 'index.html'), templateHtmlFile);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function copyFiles(folderPath, copyFolderPath) {
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

// async function bundle(pathToFolder, pathToBundleFile) {
//   try {
//     const styleFiles = await readdir(pathToFolder, { withFileTypes: true });
//     let arrStyles = [];

//     for (let file of styleFiles) {
//       let { name } = file;
//       let fileExtension = name.split('.');
//       fileExtension = fileExtension[fileExtension.length - 1];

//       if (file.isFile() && fileExtension === 'css') {
//         const input = fs.createReadStream(
//           path.join(pathToFolder, name),
//           'utf-8'
//         );
//         input.on('data', (chunk) => arrStyles.push(chunk));
//         const output = fs.createWriteStream(pathToBundleFile);
//         input.on('end', () => output.write(arrStyles.join('\n\n')));
//       }
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// function buildPage() {
//   createHtmlMarkup();
//   bundle(pathStyles, path.join(pathProjectDist, 'style.css'));
//   copyFiles(pathAssets, path.join(pathProjectDist, 'assets'));
// }



// const path = require('path');
// const { promises: fsP } = require('fs');
// const { stderr, stdout } = require('process');
// const fs = require('fs');

// const destDr = path.join(__dirname, 'project-dist');

// const assetsDr = path.join(__dirname, 'assets');
// const assetsDestDr = path.join(destDr, 'assets');

// const stylesDr = path.join(__dirname, 'styles');
// const bundleStyle = path.join(destDr, 'style.css');

// const componentDr = path.join(__dirname, 'components');
// const templateHtml = path.join(__dirname, 'template.html');
// const indexHtml = path.join(destDr, 'index.html');

// async function mergeCss(srcDr, bundleStyle) {
//   try {
//     const entries = await fsP.readdir(srcDr, { withFileTypes: true });
//     const files = entries.filter((file) => !file.isDirectory());
//     const writableStream = fs.createWriteStream(bundleStyle, 'utf-8');
//     for (let file of files) {
//       let srcFile = path.join(srcDr, file.name);
//       let extensio = path.extname(srcFile);
//       if (extensio === '.css') {
//         let codeLines = '';
//         const readableStream = fs.createReadStream(srcFile, 'utf-8');
//         readableStream.on('data', (chunk) => (codeLines += chunk));
//         readableStream.on('error', (error) =>
//           console.error(`Error read file: ${error}`)
//         );
//         readableStream.on('end', () => {
//           writableStream.write(codeLines);
//         });
//       }
//     }
//   } catch (err) {
//     stderr.write(`Error bundle file: ${err}`);
//   }
//   stdout.write('CSS bandled' + '\r\n');
// }

// const components = [];

// async function componentReader(srcFile) {
//   return new Promise((res, rej) => {
//     let codeLines = '';
//     const readableStream = fs.createReadStream(srcFile, 'utf-8');
//     readableStream.on('data', (chunk) => (codeLines += chunk));
//     readableStream.on('error', (err) => rej(err));
//     readableStream.on('end', () => {
//       res({ name: path.basename(srcFile, '.html'), data: codeLines });
//     });
//   });
// }

// async function componentCreator(data, components, indexHtml) {
//   components.forEach((component) => {
//     data = data.split(`{{${component.name}}}`).join(component.data);
//   });

//   const writableStream = fs.createWriteStream(indexHtml, 'utf-8');
//   writableStream.write(data);
//   // stdout.write(`write ${indexHtml}` + '\r\n');
// }

// const responces = [];
// async function bundlerHtml(indexHtml, componentDr, templateHtml) {
//   try {
//     const entries = await fsP.readdir(componentDr, { withFileTypes: true });
//     const files = entries.filter((file) => !file.isDirectory());
//     for (let file of files) {
//       const srcFile = path.join(componentDr, file.name);
//       let extensio = path.extname(srcFile);
//       if (extensio === '.html') {
//         try {
//           responces.push(componentReader(srcFile));
//         } catch (err) {
//           stderr.write(`Error components read: ${err}`);
//         }
//       }
//     }

//     Promise.allSettled(responces).then((results) => {
//       results.forEach((result) => {
//         if (result.status === 'fulfilled') {
//           components.push(result.value);
//         } else {
//           stderr.write(`Error promise components: ${result.reason}`);
//         }
//       });
//       const readableStream = fs.createReadStream(templateHtml, 'utf-8');
//       let codeLines = '';

//       readableStream.on('data', (chunk) => (codeLines += chunk));
//       readableStream.on('error', (error) => console.error(`${error}`));
//       readableStream.on('end', () =>
//         componentCreator(codeLines, components, indexHtml)
//       );
//     });
//   } catch (err) {
//     stderr.write(`Error components read: ${err}`);
//   }
//   stdout.write('HTML bondled' + '\r\n');
// }

//// correctly does not work, must separate on two func
// async function copyDir(srcDr, destDr) {
//   try {
//     await fs.mkdir(destDr, { recursive: true });
//     let entries = await fs.readdir(srcDr, {
//       withFileTypes: true,
//     });
//     console.log('entries', entries);
//     for (let file of entries) {
//       let srcPath = path.join(srcDr, file.name);
//       let destPath = path.join(destDr, file.name);

//       console.log('srcPath', srcPath);
//       console.log('destPath', destPath);

//       file.isDirectory()
//         ? await copyDir(srcPath, destPath)
//         : await fs.copyFile(srcPath, destPath);
//       stdout.write(`copy ${file.name} to ${destPath}` + '\r\n');
//     }
//   } catch (err) {
//     stderr.write(`Error copy dir: ${err}`);
//   }
// }
//////////

// async function copyFile(srcPath, destPath) {
//   try {
//     const entries = await fsP.readdir(srcPath, { withFileTypes: true });
//     for (let file of entries) {
//       let srcPathCopy = path.join(srcPath, file.name);
//       let destPathCopy = path.join(destPath, file.name);
//       if (file.isFile()) {
//         try {
//           await fsP.copyFile(srcPathCopy, destPathCopy);
//         } catch (err) {
//           stderr.write(`Error copy file: ${err}`);
//         }
//       } else {
//         copyDir(srcPathCopy, destPathCopy);
//       }
//     }
//   } catch (err) {
//     stderr.write(`Error copy DR: ${err}`);
//   }
// }

// async function copyDir(srcDr, destDr) {
//   try {
//     await fsP.rm(destDr, { recursive: true, force: true });
//     try {
//       await fsP.mkdir(destDr, { recursive: true });

//       copyFile(srcDr, destDr);
//     } catch (err) {
//       stderr.write(`Error create dir: ${err}`);
//     }
//   } catch (err) {
//     stderr.write(`Error remove dir: ${err}`);
//   }
//   stdout.write('Assets copied' + '\r\n');
// }

// (async function builderHtml() {
//   try {
//     await fsP.rm(destDr, { recursive: true, force: true });

//     try {
//       await fsP.mkdir(destDr, { recursive: true });
//       await mergeCss(stylesDr, bundleStyle);
//       await bundlerHtml(indexHtml, componentDr, templateHtml);
//       await copyDir(assetsDr, assetsDestDr);
//     } catch (err) {
//       stderr.write(`Error create DR: ${err}`);
//     }
//   } catch (err) {
//     stderr.write(`Error remove DR: ${err}`);
//   }
// })();




// const fs = require('fs');
// const path = require('path');
// const promiseFs = require('fs/promises');
// const { stderr } = process;

// const prjectsFolder = path.join(__dirname, 'project-dist');
// const folder = path.join(__dirname, 'assets');
// const folderCopy = path.join(__dirname, 'project-dist', 'assets');
// const htmlFolder = path.join(__dirname, 'components');
// const htmlTemp = path.join(__dirname, 'template.html');
// const htmlBundel = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
// const styles = path.join(__dirname, 'styles');
// const styleBundel = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

// const distCreat = async (folderDist) => {
//   promiseFs.mkdir(folderDist, {recursive: true}, err => {
//     if (err) stderr.write(err.message);
//   });
// };

// const dirCopy = async (folder, folderCopy) => {
//   try {
//     await promiseFs.rm(folderCopy, { force: true, recursive: true });
//     await promiseFs.mkdir(folderCopy);

//     const givenDir = await promiseFs.readdir(folder, { withFileTypes: true });
  
//     givenDir.forEach(async (files) => {
//       const folderFiles = path.join(folder, files.name);
//       const folderCopyFiles = path.join(folderCopy, files.name);
                      
//       if (files.isFile()) {
//         await promiseFs.copyFile(folderFiles, folderCopyFiles);
//       } else {
//         dirCopy(folderFiles, folderCopyFiles);
//       }
//     });
//   } catch (err) {
//     if (err) stderr.write(err.message);
//   }
// };

// const buildHtml = async (htmlFile) => {  
//   const htmlData = await promiseFs.readdir(htmlFile, { withFileTypes: true });
//   let readHtml =  await promiseFs.readFile(htmlTemp, 'utf-8');
  
//   for (let elem of htmlData) {
//     const htmlStr = path.join(htmlFile, elem.name);
  
//     if (elem.isFile() && path.extname(htmlStr) === '.html') {
//       const htmlText = await promiseFs.readFile(htmlStr, 'utf-8');
//       readHtml = readHtml.replace(`{{${path.parse(htmlStr).name}}}`, htmlText);
//     }
//   }
//   htmlBundel.write(readHtml);
// };

// const buildStyles = async (styles) => {

//   fs.readdir(styles, (err, folder) => {
//     if (err) stderr.write(err.message);
    
//     folder.forEach(elem => {
//       const folderComp = path.join(styles, elem);
    
//       if (path.extname(folderComp) === '.css') {
//         const dataStyles = fs.createReadStream(folderComp, 'utf-8');
    
//         dataStyles.on('data', data => 
//           styleBundel.write(data + '\n'));
//       }
//     });
//   });
// };

// async function createDist() {
//   try {
//     await distCreat(prjectsFolder);
//     await dirCopy(folder, folderCopy);
//     await buildHtml(htmlFolder);
//     await buildStyles(styles);
//   } catch (err) {
//     if (err) stderr.write(err.message);
//   }
// }

// createDist();


const fs = require('fs')
const fsPromise = require('fs/promises')
const path = require('path')



async function mkFolder () {
    const pathToFolder = path.join(__dirname, 'project-dist')
    fs.mkdir(pathToFolder, { recursive: true}, (err) => {
        if (err) throw err
    })
}
mkFolder()


async function readTemplate () {
    let readTemplateHTML = await fs.createReadStream( path.join(__dirname, 'template.html'))
    readTemplateHTML.on('data', chunk => {
        fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html')).write(chunk)
    })
    let readDistHTML = await fs.readFile( path.join(__dirname, 'project-dist', 'index.html'), data => {
        console.log(data)
    })
    const filesInFolder =  await fsPromise.readdir(path.join(__dirname, 'components'))
    console.log( filesInFolder)
    for (file of filesInFolder ) {
        // console.log(path.join(__dirname, 'components',file))
        // console.log(path.parse(path.join(__dirname, 'components',file)).name)
        let componentName = path.parse(path.join(__dirname, 'components',file)).name
        console.log(componentName)
        // readDistHTML.on('data', chunk => {
        //     console.log('chunk',chunk)
        //     console.log('componentName',componentName)
        //     if (chunk === componentName) {console.log('YPAAAAA')}
        //     fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html')).write(chunk)
        // })
        // fs.copyFile(path.join(pathToFolder,file), path.join(pathToCopyFolder,file), () => {})
    }
}
readTemplate ()
async function htmlComponents () {

}