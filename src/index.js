const { absolutePath, getMDfilesorDirectories } = require('./function.js')
const chalk = require('chalk');
console.log(chalk.blue("hola mundo"));

const mdLinks = (path, option = { validate: false }) => {
    return new Promise((resolve, reject) => {
        const verifyAbsolut = absolutePath(path);
        const containerArray = getMDfilesorDirectories(verifyAbsolut);
        //console.log(containerArray,9);
        //resolve(containerArray)
    })
}
mdLinks("src/carpetadePruebas").then((response)=>{
    console.log(response,14);
})