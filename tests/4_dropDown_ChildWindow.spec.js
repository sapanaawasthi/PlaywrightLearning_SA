const {test,expect} =require('@playwright/test')

test('@Web UiControls',async({page})=>
{

    // declare the variable to easy use
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   const userName = page.locator('#userEmail');
   const passWord = page.locator("[name ='password']");
   const signIn = page.locator('#signInBtn');
   const dropdown = page.locator("select.form-control"); // dropdown are storing in one varriable
   const documentLink= page.locator("[href*='documents-request']");


 await dropdown.selectOption("Consultant");// dropdown value selects

 await page.locator("input[value='user']").click(); //Radio button Selection

 await page.locator("#okayBtn").click(); // Click on okay button at pop up 

 console.log(await page.locator("input[value='user']").isChecked()); // print true or false according to selection of radio button

 await expect (page.locator("input[value='user']")).toBeChecked(); //Validate radiobutton is checked or not 

 await page.locator("#terms").click();  //Checkbox checked and validate

 await expect(page.locator("#terms")).toBeChecked(); // validate checkbox is checked

await page.locator("#terms").uncheck(); // Checkbox unchechecked but can not Validate because method is not available

expect(await page.locator("#terms").isChecked()).toBeFalsy();


  //test the blink text and Validate
   await expect (documentLink).toHaveAttribute("class","blinkingText");// to validate this link we are giving wrong spelling ,test will be failed.
  //await page.pause();
});

test.only ('ChildWindowHandle',async({browser})=>
  
{
  const context = await browser.newContext();// fresh browser opened
  const page =await context.newPage();// New Page Opened
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink= page.locator("[href*='documents-request']");
  
  const [newPage] = await Promise.all([

    context.waitForEvent('page'), // listen for any new 
    documentLink.click(),
     ]) 

    const  text = await newPage.locator(".im-para.red").textContent();
    const arrayText = text.split("@");
    const domain =  arrayText[1].split(" ")[0];
    console.log(domain);
    //await page.locator("#username").fill(domain);
    //console.log(await page.locator("#username").inputValue());

});



