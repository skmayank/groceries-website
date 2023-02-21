import React,{useEffect, useState} from 'react';
import fetchProducts from '../../utils/utils';
import { ProductTypes } from './List.types'
const List = () => {

    const [products, setProducts] = useState<ProductTypes[]>([]);

    //SETTING PRODUCTS TO STATE
    const setProductResponse = async() => {
        const response = await fetchProducts();
        setProducts(response);
    }

    useEffect(() => {
        if(products.length === 0) {
            setProductResponse();
        }
    },[products.length])

    console.log(products)
    return (
        <div>
            List
        </div>
    );
};

export default List;