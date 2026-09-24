const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./Utill/ApiUtils.js'); //import Api Class
const loginPayLoad = { userEmail: "sapana.mca@gmail.com", userPassword: "Sapana123" };
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
 
let response;//declare a varriable

test.beforeAll( async()=>
{
   const apiContext = await request.newContext();  // for Api call 
   const apiUtils = new ApiUtils(apiContext,loginPayLoad); // create a object og ApiUtills Class
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
//create order is success
test('API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order -