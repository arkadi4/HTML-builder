// const fs = require('fs');
// const path = require('path');
// const fsProm = require('fs/promises');
// const stylesSrc = path.join(__dirname, 'styles');
// const projectSrc = path.join(__dirname, 'project-dist', 'bundle.css');

// let writeStream = fs.createWriteStream(projectSrc);

// async function mergeCSS () {
//   const files = await fsProm.readdir(stylesSrc);
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

// mergeCSS();




// const fs = require('fs');
// const path = require('path');
// const { readdir } = require('fs/promises');

// const pathToFolder = path.join(__dirname, 'styles');
// const pathToDistFolder = path.join(__dirname, 'project-dist');
// const pathToBundleFile = path.join(pathToDistFolder, 'bundle.css');

// async function bundle() {
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

// bundle();




// const path = require('path');
// const { promises: fsP } = require('fs');
// const { stderr, stdout } = require('process');
// const fs = require('fs');

// const srcDr = path.join(__dirname, 'styles');
// const destDr = path.join(__dirname, 'project-dist');
// const bundleFile = 'bundle.css';

// async function mergeCss() {
//   try {
//     const entries = await fsP.readdir(srcDr, { withFileTypes: true });
//     const files = entries.filter((file) => !file.isDirectory());
//     const destFile = path.join(destDr, bundleFile);
//     const writableStream = fs.createWriteStream(destFile, 'utf-8');
//     for (let file of files) {
//       let srcFile = path.join(srcDr, file.name);
//       let extensio = path.extname(srcFile);
//       if (extensio === '.css') {
//         let codeLines = '';
//         const readableStream = fs.createReadStream(srcFile, 'utf-8');
//         readableStream.on('data', (chunk) => (codeLines += chunk));
//         readableStream.on('error', (error) => console.error(`${error}`));
//         readableStream.on('end', () => {
//           writableStream.write(codeLines);
//         });
//       }
//     }
//   } catch (err) {
//     stderr.write(`${err}`);
//   }
//   stdout.write('fales bandled');
// }
// mergeCss();




// const fs = require('fs');
// const path = require('path');
// const { stderr } = process;

// const filesStyle = path.join(__dirname, 'styles');
// const bundelStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

// fs.readdir(filesStyle, (err, folder) => {
//   if (err) stderr.write(err.message);

//   folder.forEach(elem => {
//     const folderComp = path.join(filesStyle, elem);

//     if (path.extname(folderComp) === '.css') {
//       const dataStyles = fs.createReadStream(folderComp, 'utf-8');

//       dataStyles.on('data', data => 
//         bundelStyle.write(data + '\n'));
//     }
//   });
// });


const fs = require('fs')
const fsPromise = require('fs/promises')
const path = require('path')

async function makeBundle () {
    
    const pathToFolder = path.join(__dirname, 'styles')  
    const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css')
    const filesInFolder =  await fsPromise.readdir(pathToFolder)
    let writeStream = fs.createWriteStream(pathToBundle)
    console.log( filesInFolder)
    for (file of filesInFolder ) {

        if (path.extname(file) === '.css') {
            let pathToFile = path.join(pathToFolder, file)
            console.log(pathToFile)
            await fs.createReadStream(pathToFile, 'utf8').on('data',  (chunk) => {
                // console.log(chunk)
                
                writeStream.write(chunk)
            })
        }
    }
}
makeBundle()



// const fs = require('fs');
// const path = require('path');
// const fsProm = require('fs/promises');
// const stylesSrc = path.join(__dirname, 'styles');
// const projectSrc = path.join(__dirname, 'project-dist', 'bundle.css');

// let writeStream = fs.createWriteStream(projectSrc);

// async function mergeCSS () {
//   const files = await fsProm.readdir(stylesSrc);
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

// mergeCSS();