
// function convertirExcelArray(){
// const a = document.getElementById("demo").onchange = (evt) => {
//   var reader = new FileReader();

//   reader.addEventListener("loadend", (evt) => {

//     var workbook = XLSX.read(evt.target.result, {type: "binary"}),
//         worksheet = workbook.Sheets[workbook.SheetNames[0]],
//         range = XLSX.utils.decode_range(worksheet["!ref"]);

//     let data = [];
//     for (let row=range.s.r; row<=range.e.r; row++) {
//       let i = data.length;
//       data.push([]);
//       for (let col=range.s.c; col<=range.e.c; col++) {
//         let cell = worksheet[XLSX.utils.encode_cell({r:row, c:col})];
//         data[i].push(cell.v);
//       }
//     }
//     console.log(data);
//   });
  

//   reader.readAsArrayBuffer(evt.target.files[0]);
// };
// }

// funcion asyn 
async function convertirExcelArray(){
const a = document.getElementById("demo").onchange = (evt) => {
  var reader = new FileReader();

  reader.addEventListener("loadend", (evt) => {

    var workbook = XLSX.read(evt.target.result, {type: "binary"}),
        worksheet = workbook.Sheets[workbook.SheetNames[0]],
        range = XLSX.utils.decode_range(worksheet["!ref"]);

    let data = [];
    for (let row=range.s.r; row<=range.e.r; row++) {
      let i = data.length;
      data.push([]);
      for (let col=range.s.c; col<=range.e.c; col++) {
        let cell = worksheet[XLSX.utils.encode_cell({r:row, c:col})];
        data[i].push(cell.v);
      }
    }
    console.log(data);
  });
  

  reader.readAsArrayBuffer(evt.target.files[0]);
};
}


// webscraping a googlemaps 

/***
 * namePyme --> col
 * direccionPyme -->
 */

function gooleMapsData(namePyme, direccionPyme){
    const puppeteer = require('puppeteer');
    const cheerio = require('cheerio');
    const fs = require('fs');
    // modificar la url a comillas invertidas
    const url = `https://www.google.com/maps/search/${namePyme}+${direccionPyme}`;

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
    
        const html = await page.content();
        const $ = cheerio.load(html);
    
        const data = [];
    
        $('.section-result').each((i, el) => {
        const title = $(el).find('.section-result-title span').text();
        const address = $(el).find('.section-result-location span').text();
        const phone = $(el).find('.section-result-phone-number').text();
    
        data.push({
            title,
            address,
            phone
        });
        });
    
        fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) throw new Error('Something went wrong');


}

