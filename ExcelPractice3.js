const Exceljs = require('exceljs');
const varbook= new Exceljs.Workbook();// creat object of class


async function testmodify()
{
  let output ={row:-1,coloumn:-1}; //creating a object and its property

await varbook.xlsx.readFile("C:/Users/rohan/testExcel.xlsx");
const varsheet= varbook.getWorksheet("Sheet1");

varsheet.eachRow((row,rowNumber)=>
{
   row.eachCell((cell,colNumber)=>
   {
     if(cell.value ==="Banana")
     {
       output.row = rowNumber;
       output.coloumn= colNumber;  

     }   

   })
})
// updating value from Apple to Iphone 
const cellvar = varsheet.getCell(output.row,output.coloumn);
cellvar.value = "Republic";
await varbook.xlsx.writeFile("C:/Users/rohan/testExcel.xlsx");


}

testmodify();





