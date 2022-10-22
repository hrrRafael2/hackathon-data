
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
function convertirExcelArray(){
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


// desestructurar el array del excel 
function desArray(data){
    const [name,domicilio] = data;
     
}

// generar resultados en google maps

async function getData(query){

  const { chromium } = require("playwright");


  // definimos playwight
  // utilizaremos playwhrigt
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // ir a la pagina de google maps
  await page.goto('https://maps.google.com/');
  // traer el input de busqueda
  await page.type('input[name="q"]', query);
  await page.keyboard.press('Enter');
  // esperar a que cargue la pagina
  await page.waitForNavigation();
  
  // captura de pantalla 
  await page.screenshot({path: `./screenshots/${query}.png`});
  

  // cerrar el navegador
  await browser.close();
}

convertirExcelArray();
getData('Tacos estado de mexico');
    