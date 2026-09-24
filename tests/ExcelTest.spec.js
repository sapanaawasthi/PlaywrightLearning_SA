const {test,expect} = require('@playwright/test');
const Exceljs = require('exceljs');

async function writeExcelTest(searchText,replaceText,change,filePath)
{
  const varbook= new Exceljs.Workbook();// creat object of class
 await varbook.xlsx.readFile(filePath);
const varsheet= varbook.getWorksheet("Sheet1");
const output= await readExcel(varsheet,searchText); // call methood

// updating value 

const cellvar = varsheet.getCell(output.row,output.coloumn+change.colChange);
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
     if(cell.value == searchText)
     {
       output.row = rowNumber;
       output.coloumn= colNumber;  

     }   

   })

})
return output;

} 

test('Upload Download Excel',async({page})=>
 {
   const textSearch = 'Mango';
   const updateValue = '950';
   await page.goto("https://rahulshettyacademy.com/upload-download-test/");

   const downloadPromise = page.waitForEvent('download');  
   await page.getByRole('button',{name:'Download'}).click();
   const downloadEvent= await downloadPromise;
   await downloadEvent.saveAs("C:/Users/rohan/testExcel1.xlsx"); //playwright not saving excel in local. It only saves in memory. So to save file actually in local, we used SaveAs()
   
   //methood calling 
   await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 },"C:/Users/rohan/testExcel1.xlsx");

   await page.locator('#fileinput').click();
   await page.locator('#fileinput').setInputFiles("C:/Users/rohan/testExcel1.xlsx");// this method is used to Upload file.
   
   //assertion of updating value.
   const textLocator = page.getByText(textSearch);
   const desiredRow=await page.getByRole('row').filter({has:textLocator});
   await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
    
    })