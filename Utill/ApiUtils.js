class ApiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }
 
    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        })
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = await orderResponseJson.orders[0];
        response.orderId = orderId;
        console.log(response.orderId)
         return response;
         

//    const orderResponseJson =await orderResponse.json();
//    const orderId = await orderResponseJson.orders[0];
//    ordertoken.orderId = orderId
//    console.log(ordertoken.orderId)
//    return ordertoken;

    
    }
}
 
module.exports = { ApiUtils };
