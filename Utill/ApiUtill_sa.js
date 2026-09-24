class ApiUtill_sa {

    constructor(apiContext1,loginPayLoad1)
     {

        this.objContext1 = apiContext1;
        this.objPayLoad1 = loginPayLoad1;
    }
   

   async reciveToken() {  //Token generating from Api

        const loginresponse1 = await this.objContext1.post("https://www.rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.objPayLoad1 });

        const loginResponseJson1 = await loginresponse1.json();
        const token1 = await loginResponseJson1.token;
        console.log(token1);      
        return token1;
    }

    async createOrder(orderPayLoad1)
    {
        let ordertoken= {};
        ordertoken.token = await this.reciveToken();    
        const orderResponse1= await this.objContext1.post("https://www.rahulshettyacademy.com/api/ecom/order/create-order",
        {data:orderPayLoad1,
         headers:{
                  'authorization':ordertoken.token ,
                  'content-type' : 'application/json'
                  }
  
        }
    );
   const orderResponseJson =await orderResponse1.json();
   const orderId1 = await orderResponseJson.orders[0];
   ordertoken.orderId = orderId1
   console.log(ordertoken.orderId)
   return ordertoken;

    }

}

module.exports= {ApiUtill};    // to make export in Test class