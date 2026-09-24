const Exceljs=require('exceljs');
//create a object of class Excel js 

const varWorkbook=new Exceljs.Workbook()//using object call the workbook method

async function excelTest()
{
await varWorkbook.xlsx.readFile("C:/Users/rohan/testExcel.xlsx");
const varworksheet= varWorkbook.getWorksheet(1);           //calling methood for Worksheet

//for loop

varworksheet.eachRow((row,rowNumber)=>
  {

    row.eachCell((cell,colNumber) =>
     {
        

            console.log(cell.value);
     }


    )
  })

}
excelTest();


