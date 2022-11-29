const {mdLinks} = require('../src/index.js');


describe('mdLinks', () => {

    it('should be a function', () => {
      expect(typeof mdLinks).toBe('function');
    });


    const arrayURL = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:/Users/famil/BOG005-md-links/src/carpetadePruebas/prueba.md' 
      },
      
    ]

    const arrayLinksTrue = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown2',
        file: 'C:/Users/famil/BOG005-md-links/src/carpetadePruebas/prueba.md',
        status: 200,
        mensaje: 'OK'
      },
    ]

  it('Procesar archivo sin validación', () => {
    return mdLinks("../src/carpetadePruebas")
      .then(res => expect(res).toEqual(arrayURL))
  });


  it('Procesar archivo + --validate', () => {
    return mdLinks("../src/carpetadePruebas", { validate : true})
      .then(res => expect(res).toEqual(arrayLinksTrue))
  });

});
