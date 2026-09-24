const { expect } = require("@playwright/test");
class OrderHistoryPage{

constructor(page)
{
this.orderMenu = page.locator("button[routerlink*='myorders']");
this.myordersTable= page.locator("tbody");
this.tableRows = page.locator("tbody tr"); 
this.tableCol  =   page.locator(".col-text");

}
async viewOrder(orderId)
{
      await this.orderMenu.click();
      await this.myordersTable.waitFor();
    
  for (let i = 0; i < await this.tableRows.count(); i++) 
    {
        const rowOrderId = await this.tableRows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
           await this.tableRows.nth(i).locator("button").first().click();
           break;
        }
     }
      const orderIdDetails = await this.tableCol.textContent();
     expect(orderId.includes(orderIdDetails)).toBeTruthy();
  

}

}

module.exports={OrderHistoryPage};



