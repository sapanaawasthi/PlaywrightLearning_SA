const {test,expect}= require('@playwright/test');
const { config } = require('process');

test('Special Locators', async ({page})=>
 
{
   const slowExpect = expect.config({timeout:9000});// create custom level wait
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.locator("div[class='form-group'] input[name='name']").fill("sapana.mca@gmail.com");
    await page.getByPlaceholder("Password").fill("Sapana123");


    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");     
    await page.getByRole("button", {name:'Submit'}).click();
    //isvisible- returns true or false value on the basis of test results.
      
    const bool = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    expect(bool).toBeTruthy();
    console.log(bool);
      
      // toBeVisible--Pass or fail testscripts if text is not available.
    await expec(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000});

    // Step Level
    slowExpect= await expec(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();


   await page.getByRole("link", {name:'Shop'}).click({timeout:15000});
   await page.locator("app-card").filter({hasText:'Samsung Note 8'}).getByRole("button").click();


    
});

