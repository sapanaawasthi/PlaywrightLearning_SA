const{test}=require('@playwright/test');
//test('first playwright test',async function()

test('Browser playwright test',async ({browser})=>
{
//Open chrome browser only
   const context = await browser.newContext(); 

   const page = await context.newPage(); 
   await page.goto("https://login.yahoo.com/")
}
);

test('Page playwright test',async ({page})=>
{
 await page.goto("https://www.facebook.com/login/")
}
);