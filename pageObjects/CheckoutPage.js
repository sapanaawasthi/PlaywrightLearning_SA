import { expect } from '@playwright/test'; 
class CheckoutPage
{
   constructor(page)
   {
     this.page = page; 
    this.mycartSection = page.locator("div li")
    this.checkoutButton =page.locator("text=Checkout");

   }
   async MycartValidate(productName)

   {
    await this.mycartSection.first().waitFor(); // finding first list
    //const bool = await this.page.locator("h3:has-text(productName)").isVisible();
    const bool = await this.page.locator("h3").filter({ hasText: productName }).isVisible();
    expect(bool).toBeTruthy();
    console.log (bool);
    
   }
    async clickCheckout()
    {

        await this.checkoutButton.click();

    }


}

module.exports={CheckoutPage};