const {test,expect} = require('@playwright/test');
const {Loginpage} = require('../pageObjects/Loginpage');
const {DashboardPage} = require('../pageObjects/DashboardPage');
const {CheckoutPage} = require('../pageObjects/CheckoutPage');
const {OrderPage}= require('../pageObjects/OrderPage');
const {OrderHistoryPage} =require('../pageObjects/OrderHistoryPage');

test('EcommerceWebsitePO',async({page})=>
{ 
    const username = "sapana.mca@gmail.com";
    const password ="Sapana123"
    const productName = 'ZARA COAT 3';
    const countryName ="India";
    
    
    // creating a object of class that's why contructor will be autocall;
     const loginpage =new Loginpage(page);
     await loginpage.goTo();
     await loginpage.validLogin(username,password);
    //DashBoard class
     const dashboardPage = new DashboardPage(page);
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateTocart();

    //Checkout Page class
    const checkoutpage = new CheckoutPage(page); 
    await checkoutpage.MycartValidate(productName);
    await checkoutpage.clickCheckout();

//OrderPage class
    const orderpage = new OrderPage(page);
    await  orderpage.selectCountry(countryName);
    await orderpage.orderPlaced(username);
    const OrderID1=await  orderpage.navigatedTothanks();  


  // OrderHistoryPage class
  const orderhistory= new OrderHistoryPage(page);
  await page.pause();
  await orderhistory.viewOrder(OrderID1);
  


//    await page.locator("button[routerlink*='myorders']").click();
//    await page.locator("tbody").waitFor();
//    const rows = await page.locator("tbody tr"); 

//       for (let i = 0; i < await rows.count(); ++i) {
//       const rowOrderId = await rows.nth(i).locator("th").textContent();
//       if (orderId.includes(rowOrderId)) {
//          await rows.nth(i).locator("button").first().click();
//          break;
//       }
//    }
//     const orderIdDetails = await page.locator(".col-text").textContent();
//    expect(orderId.includes(orderIdDetails)).toBeTruthy();


   

          
    });






