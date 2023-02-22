
import axios from 'axios';

//API TO GET PRODUCTS
const fetchProducts = async() => {
    const response = await axios.get('https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all')
    return response?.data
}

export const getCartDataFromLocalStorage = (keyName: string) => {
    return localStorage.getItem(keyName);
}

export const setCartDataToLocalStorage = (data: any, keyName: string) => {
    localStorage.setItem(keyName, JSON.stringify(data));
}

export const getTotalAmount = (data:any) => {
    let subTotal = 0;
    let discount = 0;
    let total = 0;
    data.map((item:any) => {
        let price = item.price.replace(/[^\x00-\x7F]/g, "");
        //OFFER IF BUY 6 COCA CAN THEN ONE CAN PRICE WILL BE MINUS
        subTotal = subTotal + parseFloat(price) * item.totalItemAdded;
        if (item.name === 'Coca-Cola' && item.totalItemAdded >= 6) {
            total = total + parseFloat(price) * (item.totalItemAdded - 1);
            discount =  discount +  parseFloat(price)*1
        }
        //OFFER IF BUY 3 COFFEE THEN ONE CAN PRICE WILL BE MINUS
        else if (item.name === 'Coffee' && item.totalItemAdded >= 3) {
            total = total + parseFloat(price) * (item.totalItemAdded - 1); 
            discount =  discount +  parseFloat(price)*1
        }
        else {
            total = total + parseFloat(price) * item.totalItemAdded;
        }
    })
    return {total, discount, subTotal};
}

export default fetchProducts;