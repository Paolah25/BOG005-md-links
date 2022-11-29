const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const {marked}  = require('marked')
const axios = require('axios');
const routerTheFiles = "carpetadePruebas";

// Pasar ruta relativa a ruta absoluta
const absolutePath = (router) => {
  if (path.isAbsolute(router)) {
    return router;
  }
  else {
    return path.resolve(router).normalize();
  }

}

// console.log(absolutePath(routerTheFiles),19);

// Funcion recursiva

function getMDfilesorDirectories(allFileMD) {
  const isFile = fs.statSync(allFileMD).isFile();
  const isDirectory = fs.statSync(allFileMD).isDirectory();
  const readextName = path.extname(allFileMD);
  let arrayMarkDown = [];
  let pathContainer = absolutePath(allFileMD);
  // console.log(chalk.cyan(pathContainer));
  if (isFile && readextName === '.md') {
    arrayMarkDown.push(pathContainer)
    // console.log(chalk.magenta(arrayMarkDown));
  } else if (isFile && readextName !== '.md') {
    // console.log(chalk.red('Archivo no tiene extensión .md son', readextName))
  } else if (isDirectory === true) {
    fs.readdirSync(allFileMD).forEach(file => {
      let routePath = path.join(allFileMD, file);
      // console.log(fs.readdirSync(allFileMD))
      // console.log(chalk.magenta(routePath));
      if (isDirectory) {
        arrayMarkDown = arrayMarkDown.concat(getMDfilesorDirectories(routePath))
      } else {
        if (path.extname(routePath) === '.md') {
          arrayMarkDown.push(routePath)
        }
      }
    })
  }
  return arrayMarkDown; // Retornando un array de archivos MD 
}
// Lectura de archivos md

const readMds = (file) => {
  return new Promise((resolve, reject) => {
    let arrayObjects = [];
    fs.readFile(file, 'utf8', (err, info) => {
      if (err) { resolve(err) };
      const renderer = new marked.Renderer()
      renderer.link = function (href, title, text) {
        const objectContainer = {
          'href': href,
          'text': text,
          'file': file,
        }
        if (objectContainer.href.includes('http')) {
          arrayObjects.push(objectContainer);
        }
      }
      marked(info, { renderer })

      resolve(arrayObjects);
    });
  })
}

// readMds("C:/Users/famil/BOG005-md-links/src/carpetadePruebas/prueba.md").then((val) => { console.log("probando", val.flat()) })
//console.log(containerArray);

function validateArray(arrayObjects) {
  const arrayObjectsMod = arrayObjects.map((obj) => {
    return axios.get(obj.href)
      .then((res) => {
        obj.status= res.status; 
        obj.mensaje= "OK"; 
        // console.log(res.status, res.statusText, 84);
        return obj; 
      })

      .catch((error => {
         obj.status = 404; 
         obj.mensaje= "ERROR";  
         return obj; 
      }))
  })

  return Promise.all(arrayObjectsMod).then(res=>res)
 }
// readMds("C:/Users/famil/BOG005-md-links/src/carpetadePruebas/prueba.md").then((val) => {
//   validateArray(val).then(resultado => console.log(resultado, 'esto es lo validado'));
//   })
module.exports = { absolutePath, getMDfilesorDirectories, readMds, validateArray }

