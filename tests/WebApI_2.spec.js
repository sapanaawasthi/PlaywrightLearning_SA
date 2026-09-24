const {test,request,expect}=require('@playwright/test');
const path = require('node:path');
let webContext;

 test.beforeAll(async({browser})=>
{
  const context= await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.rahulshettyacademy.com/client/");
  await page.locator("#userEmail").fill("sapana.mca@gmail.com");
  await page.locator("#userPassword").fill("Sapana123");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({path:'state.json'});// Cappture Login Json
    webContext = await browser.newContext({storageState:'state.json'}); //injecting new bowser window
  
});
test('@API injectApi',async()=>
{
  const page =await webContext.newPage();  
  await page.goto("https://www.rahulshettyacademy.com/client/");
 const tittles= await page.locator(".card-body b").allTextContents();
 console.log(tittles);
});

test('@API test2', async () => {
   //js file- Login js, DashboardPage
    const page = await webContext.newPage();
   const productName = 'ADIDAS ORIGINAL';
   const products = page.locator(".card-body");
   await page.goto("https://www.rahulshettyacademy.com/client/");
   await page.locator(".card-body b").first().waitFor();
   //await page.waitForTimeout(5000);
   await page.locator(".card-body").filter({hasText:"ADIDAS ORIGINAL"})
   .getByRole("button",{name:"Add to Cart"}).click(); 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   
   /*await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();*/
});

