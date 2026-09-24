const {test,expect} = require('@playwright/test');
const {customtest} =require('../Utill/TestData_Fixture');
const {POManager} = require('../pageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../Utill/TestDataCleientApp.json")));

for (const data of dataset)
{    
test(`EcommerceWebsitePO for ${data.productName}`,async({page})=>
{ 
   
    const countryName ="India";
    // creating object of Project manager class
    const pomanager= new POManager(page)
    
    const loginpage= pomanager.getLoginPage()
     await loginpage.goTo();
     await loginpage.validLogin(data.username,data.password);

//     //DashBoard class   
    const dashboardPage = pomanager.getDashbordPage(); 
     await dashboardPage.searchProductAddCart(data.productName);
     await dashboardPage.navigateTocart();

//     //Checkout Page class
    const checkoutpage = pomanager.getCheckoutPage();
    await checkoutpage.MycartValidate(data.productName);
    await checkoutpage.clickCheckout();

//OrderPage class
    const orderpage =pomanager.getOrderPage();
    await orderpage.selectCountry(countryName);
    await orderpage.orderPlaced(data.username);
    const OrderID1=await  orderpage.navigatedTothanks();  

//   // OrderHistoryPage class
  const orderhistory = pomanager.getOrderHistoryPage();
  
  await orderhistory.viewOrder(OrderID1);
           
    });
}

customtest.only('FixtureJsUsing',async({page,testDataForOrder})=>
{ 
   
    const countryName ="India";
    // creating object of Project manager class
    const pomanager= new POManager(page)
    
    const loginpage= pomanager.getLoginPage()
     await loginpage.goTo();
     await loginpage.validLogin(testDataForOrder.username,testDataForOrder.password);

//     //DashBoard class   
    const dashboardPage = pomanager.getDashbordPage(); 
     await dashboardPage.searchProductAddCart(testDataForOrder.productName);
     await dashboardPage.navigateTocart();

//     //Checkout Page class
    const checkoutpage = pomanager.getCheckoutPage();
    await checkoutpage.MycartValidate(testDataForOrder.productName);
    await checkoutpage.clickCheckout();


})


