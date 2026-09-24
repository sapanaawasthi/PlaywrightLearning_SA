const {test,expect} = require('@playwright/test');
const { log } = require('node:console');

test('@Web EcommerceWebsite2',async({page})=>
{
  const userName = page.locator('#userEmail');
  const passWord = page.locator ("[type='password']");                      //("[name ='password']");
  const signIn = page.locator('#login');
  const products = page.locator(".card-body");
  const productName = 'ZARA COAT 3';

  await page.goto("https://www.rahulshettyacademy.com/client/#/auth/login");
  await userName.fill("sapana.mca@gmail.com");
  await passWord.fill("Sapana123");
  await signIn.click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body").first().waitFor();
  const titles = await page.locator(".card-body").allTextContents();
  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; i++) {
      if (await products.nth(i).locator("b").textContent() === productName) {
                 
         await products.nth(i).locator("text= Add To Cart").click();               
         break;
      }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.waitForTimeout(5000);

  await page.locator("div li").first().waitFor(); // finding first list
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  console.log (bool);

  await page.locator("text=Checkout").click();
  await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   expect(page.locator(".user__name [type='text']").first()).toHaveText("sapana.mca@gmail.com");
  
   await page.locator(".action__submit").click();

   await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr"); 

      for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
    const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();


   

          
    });

 // await page.locator('button').filter({ hasText: 'Add To Cart' }).first()





