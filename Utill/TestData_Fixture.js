const base=require('@playwright/test');

  exports.customtest =base.test.extend(
{
   testDataForOrder:
   {
    username  :"sapana.mca@gmail.com",
    password  :"Sapana123",
    productName :"ZARA COAT 3"
  } 

}



)

