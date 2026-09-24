const { test, expect, request } = require('@playwright/test');
const {ApiUtill} = require('./Utill/ApiUtill_sa.js');  // to import utill class

const loginPayLoad1 = { userEmail: "sapana.mca@gmail.com", userPassword: "Sapana123" };
const orderPayLoad1 = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let ordertoken;

test.beforeAll(async () => {

    const apiContext1 = await request.newContext();
    const ApiObj = new ApiUtill_sa(apiContext1,loginPayLoad1);   // const varToken =await ApiObj.reciveToken()
   ordertoken = await ApiObj.createOrder(orderPayLoad1);
    

  });

test ('viewOrder',async({page})=>
{
   await page.addInitScript(value=>
    {window.localStorage.setItem('token',value)},ordertoken.token); // value of token

   await page.goto("https://www.rahulshettyacademy.com/client/");
   await page.getByRole("button",{name:'  ORDERS'}).click();
   

   const rows= await page.locator("tbody tr th").count();

   for (let i=0;i<rows;i++)
   {
    const actOrderID=await page.locator("tbody tr th").nth(i).textContent()
    if (ordertoken.orderId === actOrderID)
      {

        page.locator("tbody tr").nth(i).getByText("View").click()
        break;
           }       

    }
     await page.pause(); 
      
   } );