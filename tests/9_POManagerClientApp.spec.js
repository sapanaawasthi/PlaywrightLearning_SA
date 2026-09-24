const {test,expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../Utill/TestDataCleientApp.json")));


test('EcommerceWebsitePO',async({page})=>
{ 
   
    const countryName ="India";
    // creating object of Project manager class
    const pomanager= new POManager(page)
    
    const loginpage= pomanager.getLoginPage()
     await loginpage.goTo();
     await loginpage.validLogin(dataset.username,dataset.password);

//     //DashBoard class   
    const dashboardPage = pomanager.getDashbordPage(); 
     await dashboardPage.searchProductAddCart(dataset.productName);
     await dashboardPage.navigateTocart();

//     //Checkout Page class
    const checkoutpage = pomanager.getCheckoutPage();
    await checkoutpage.MycartValidate(dataset.productName);
    await checkoutpage.clickCheckout();

//OrderPage class
    const orderpage =pomanager.getOrderPage();
    await orderpage.selectCountry(countryName);
    await orderpage.orderPlaced(dataset.username);
    const OrderID1=await  orderpage.navigatedTothanks();  

//   // OrderHistoryPage class
  const orderhistory = pomanager.getOrderHistoryPage();
  
  await orderhistory.viewOrder(OrderID1);
  


          
    });






