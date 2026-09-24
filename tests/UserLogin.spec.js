const {test,expect} =require('@playwright/test')

test('Login playwright test',async({browser})=>
{
const obj = await browser.newContext();
const obj1 =await obj.newPage();
await obj1.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await obj1.title());

// declare the variable to easy use
   const userName = obj1.locator('#username');
   const passWord = obj1.locator("[name ='password']");
   const signIn = obj1.locator('#signInBtn');
   const cardTittle = obj1.locator(".card-body a");

//Locator

//await userName.fill("rahulshetty");
//await passWord.fill("Learning@830$3mK2");
//await signIn.click();
//console.log (await obj1.locator('.alert.alert-danger.col-md-12').textContent());
//await expect(obj1.locator('.alert.alert-danger.col-md-12')).toContainText('Incorrect');

//fill () method remove the value as well


await userName.fill("rahulshettyacademy");
await passWord.fill("Learning@830$3mK2")
await signIn.click();
//await obj1.waitForTimeout(5000);
console.log(await obj1.title());

const Bool =await expect(obj1).toHaveTitle('ProtoCommerce');

console.log(Bool);

console.log(await cardTittle.first().textContent())

const allTittles= await cardTittle.allTextContents();
console.log(allTittles);

});
// hthtps://www.rahulshettyacademy.com/client/#/auth/register