const {Loginpage}= require('./Loginpage');
const {DashboardPage} = require('./DashboardPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderPage} = require('./OrderPage');
const {OrderHistoryPage} =require('./OrderHistoryPage');



class POManager
{
  constructor(page)
  {
       this.page = page; 
       this.loginpage =new Loginpage(this.page);
       this.dashboardPage = new DashboardPage(this.page);
       this.checkoutpage = new CheckoutPage(this.page); 
       this.orderpage = new OrderPage(this.page);
       this.OrderHistory= new OrderHistoryPage(this.page);
        

  }
    getLoginPage()
    {
      return this.loginpage
    }

    getDashbordPage()
    {
       return this.dashboardPage
    }
    getCheckoutPage()
    {
      return this.checkoutpage
    }

    getOrderPage()
    {
        return this.orderpage
    }

    getOrderHistoryPage()
    {
        return this.OrderHistory
        
    }
}

module.exports= {POManager};

