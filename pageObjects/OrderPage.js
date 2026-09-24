const { expect } = require("@playwright/test");
 

class OrderPage
{
    constructor(page)
    {

       this.dropdownEditbox = page.locator("input[placeholder='Select Country']");
       this.dropdown = page.locator(".ta-results");
       this.displayedEmail =page.locator(".user__name [type='text']");
       this.placeOrderButton =page.locator(".action__submit");
       this.orderIDText =  page.locator(".em-spacer-1 .ng-star-inserted");
       this.thanksText =page.locator(".hero-primary");
            

    }

    async selectCountry(countryName)
    {

      await this.dropdownEditbox.pressSequentially("ind");
      await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
         for (let i = 0; i < optionsCount; i++) 
        {
           const countryName = await this.dropdown.locator("button").nth(i).textContent();
           if (countryName === " India") 
            {
            await this.dropdown.locator("button").nth(i).click();
            break;
            }
         }
        }

    async orderPlaced(username)
     {

          await expect(this.displayedEmail.first()).toHaveText(username);        
         
          await this.placeOrderButton.click();

         }
      
      async navigatedTothanks()
      {       
       await expect(this.thanksText).toHaveText("Thankyou for the order. ", { timeout: 10000 });
       const isVisible = await this.thanksText.isVisible();
       const orderId = await this.orderIDText.textContent();
      console.log(orderId); 
      console.log(isVisible) 
      return orderId;
        
       }
}

module.exports= {OrderPage};