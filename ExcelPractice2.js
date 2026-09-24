const Exceljs = require('exceljs');// Import JS

const varbook= new Exceljs.Workbook();

async function testmodify()
{
await varbook.xlsx.readFile("C:/Users/rohan/testExcel.xlsx");
const varsheet= varbook.getWorksheet("Sheet1");

varsheet.eachRow((row,rowNuber)=>
{
   row.eachCell((cell,colNumber)=>
   {
     if(cell.value ==="Apple")
     {
       console.log(rowNuber,colNumber);   

     }   

   })
})
// updating value from Apple to Iphone 
const cellvar = varsheet.getCell(3,2);
cellvar.value = "Iphone";
await varbook.xlsx.writeFile("C:/Users/rohan/testExcel.xlsx");


}

testmodify();





