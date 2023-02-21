
import axios from 'axios';

//API TO GET PRODUCTS
const fetchProducts = async() => {
    const response = await axios.get('https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all')
    return response?.data
}

export default fetchProducts;