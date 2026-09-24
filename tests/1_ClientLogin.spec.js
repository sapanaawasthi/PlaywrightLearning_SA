const {test, expect} = require ('@playwright/test');

test ('Client login',async({page})=>
{
  await page.goto("https://www.rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("sapana.mca@gmail.com");
  await page.locator("#userPassword").fill("Sapana123");
  await page.locator("[value='Login']").click();
  //await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").last().waitFor();
 const tittles= await page.locator(".card-body b").allTextContents();
 console.log(tittles);
}

);