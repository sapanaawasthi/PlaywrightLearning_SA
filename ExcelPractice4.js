const Exceljs = require('exceljs');
const varbook= new Exceljs.Workbook();// creat object of class


async function writeExcelTest(searchText,replaceText,filePath)
{
 await varbook.xlsx.readFile(filePath);
const varsheet= varbook.getWorksheet("Sheet1");
const output= await readExcel(varsheet,searchText);

// updating value from Apple to Iphone 
const cellvar = varsheet.getCell(output.row,output.coloumn);
cellvar.value = replaceText;
await varbook.xlsx.writeFile(filePath);
}

async function readExcel(varsheet,searchText)
{
    let output ={row:-1,coloumn:-1}; //creating a object and its property        
    varsheet.eachRow((row,rowNumber)=>
{
   row.eachCell((cell,colNumber)=>
   {
     if(cell.value ===searchText)
     {
       output.row = rowNumber;
       output.coloumn= colNumber;  

     }   

   })

})
return output;

}    


writeExcelTest("Mango","Icecream","C:/Users/rohan/testExcel.xlsx");





