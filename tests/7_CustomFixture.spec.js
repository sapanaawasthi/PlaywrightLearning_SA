const {test,request,expect} =require('@playwright/test');
const {customtest}= require("./Utill/Fixture.js");

//now we are extending test behaviour

customtest("FixtureCreate",async({authnticatedPage,createOrder})=>
{

await authnticatedPage.goto("https://www.rahulshettyacademy.com/client");
await authnticatedPage.locator("button[routerlink*='myorders']").click();
await authnticatedPage.locator("tbody").waitFor();
const bool=await expect (authnticatedPage.getByText(createOrder.orderId)).toBeVisible();


});