const base =require('@playwright/test');
const {expect,request} =require('@playwright/test');
const{ApiUtils} =require('./ApiUtils.js');

const loginPayLoad = { userEmail: "sapana.mca@gmail.com", userPassword: "Sapana123" };
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

exports.customtest= base.test.extend(
{
    // use is parameter we are using to sent back to test
    //authnticate is a fixer we are creating.
 authnticatedPage: async({browser},use)=>
  {
   
  const context= await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.rahulshettyacademy.com/client/");
  await page.locator("#userEmail").fill("sapana.mca@gmail.com");
  await page.locator("#userPassword").fill("Sapana123");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await use(page);   
 },
 createOrder: async({},use)=>
{
   const apiContext = await request.newContext();
   const apiUtils = new ApiUtils(apiContext,loginPayLoad);
   const response =  await apiUtils.createOrder(orderPayLoad);
   await use(response);

}
}
);