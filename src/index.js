const { absolutePath, getMDfilesorDirectories, readMds, validateArray } = require('./function.js')
const chalk = require('chalk');


const mdLinks = (path, option = { validate: true }) => {
    return new Promise((resolve, reject) => {
        const verifyAbsolut = absolutePath(path);
        // const containerArray = getMDfilesorDirectories(verifyAbsolut);
       if( option.validate === true){
             readMds(verifyAbsolut)
             .then(res => validateArray(res))
             .then(res => resolve(res))
       } else{
        readMds(verifyAbsolut)
        .then(res => resolve(res))
       }
    })
}
// mdLinks("C:/Users/famil/BOG005-md-links/src/carpetadePruebas/prueba.md").then((response)=>{
//     console.log(response,14); 
// })

module.exports= {mdLinks}; 