
//@ts-ignore
import axios from 'axios';
import {OfferOnItems} from './constants'

//API TO GET PRODUCTS
const fetchProducts = async() => {
    try {
        const response = await axios.get('https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all')
        return response.data 
    }catch(error) {
        console.log(error)
    }
    
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
        // eslint-disable-next-line
        let price = item.price.replace(/[^\x00-\x7F]/g, "");
        console.log(price, item.totalItemAdded)
        const totalItem = item.totalItemAdded || 1;
        //OFFER IF BUY 6 COCA CAN THEN ONE CAN PRICE WILL BE MINUS
        subTotal = subTotal + parseFloat(price) * totalItem;
        if (item.name === OfferOnItems[0].item && item.totalItemAdded >= OfferOnItems[0].quantity) {
            total = total + parseFloat(price) * totalItem-OfferOnItems[0].discount;
            discount =  discount +  parseFloat(price)*1
        }
        //OFFER IF BUY 3 COFFEE THEN ONE CAN PRICE WILL BE MINUS
        else if (item.name === OfferOnItems[1].item && totalItem >= OfferOnItems[1].quantity) {
            total = total + parseFloat(price) * (totalItem - OfferOnItems[1].discount); 
            discount =  discount +  parseFloat(price)*1
        }
        else {
            total = total + parseFloat(price) * totalItem;
        }
    })
    return {total, discount, subTotal};
}

export default fetchProducts;