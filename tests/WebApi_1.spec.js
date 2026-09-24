const{test,expect,request}=require('@playwright/test');

const loginPayLoad =  {userEmail: "sapana.mca@gmail.com", userPassword: "Sapana123"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let token;
let orderId;
test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const loginResponse= await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login",
    {
    data : loginPayLoad
    })

   expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();// convert the json
    token = loginResponseJson.token;
    console.log(token);

    //create order precondition
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
   {
     data : orderPayLoad,
     headers:{
                 'authorization' :token,
                 'content-type' : 'application/json'
             },
   })
       const orderResponseJSON = await orderResponse.json();
       console.log(orderResponseJSON);
       orderId =await orderResponseJSON.orders[0];
       console.log("OrderID is",orderId);
       
} );

test('@API place the Order', async ({ page }) => {
   //js file- Login js, DashboardPage
   

   await page.addInitScript(value =>{

    window.localStorage.setItem('token',value);

   },token);

   await page.goto("https://rahulshettyacademy.com/client");
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


