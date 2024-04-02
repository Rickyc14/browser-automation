// Utilizando a biblioteca Puppeteer, esta função
// acessa "https://www.piadas.com.br" com o intuito
// de capturar e mostrar no console os títulos das
// piadas presentes na terceira página do site.


import puppeteer from 'puppeteer';

(async () => {

    // Page starts from 0
    const pageNumber = 2;

    // 2022-2023
    const url = `https://www.piadas.com.br/?page=${pageNumber}`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const jokeTitleSelector = '.views-row > article > header > div > h2 > a > span';

    await page.waitForSelector(jokeTitleSelector);

    const titles = await page.evaluate(jokeTitleSelector => {
        return [...document.querySelectorAll(jokeTitleSelector)]
            .map(element => element.textContent);
    }, jokeTitleSelector);

    console.log(titles);

    await browser.close();
})();


// Output:
//
// [
//     'qual o cúmulo da sorte',
//     'praga',
//     'Pêlo no cú',
//     'Quimioterapia',
//     'Aprenda a ler garoto',
//     'Frases machistas',
//     'O guarda de transito',
//     'A bobeira',
//     'A Conta Do Hospital',
//     'os cachorros perdidos'
// ]
