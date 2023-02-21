import React,{useEffect, useState} from 'react';

//API
import fetchProducts from '../../utils/utils';

//Types
import { ProductTypes, InputEvent, InputSelectEvent } from './List.types';

const List = () => {

    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [defaultProducts, setDefaultProducts] = useState<ProductTypes[]>([]);
    const [searchQuery, setSearchQuery] = useState<String>("");
    const [productType, setProductType] = useState<String>("");

    //SETTING PRODUCTS TO STATE
    const setProductResponse = async() => {
        const response = await fetchProducts();
        setProducts(response);
        setDefaultProducts(response);
    };

    useEffect(() => {
        if(products.length === 0) {
            setProductResponse();
        }
    },[]);

    //FILTER DATA BY SELECT AND SEARCH
    const filteredData = React.useMemo(() => {
      let filteredProducts = defaultProducts || [];
      if (searchQuery !== '' && searchQuery) {
        filteredProducts = filteredProducts.filter((item) => {
          if (item?.name.toLowerCase()?.includes(searchQuery?.toLowerCase())) return item;
        });
      }
      if (productType !== '' && productType !== 'allItems' && productType) {
        filteredProducts = filteredProducts.filter((item) => {
          if (item?.type?.toLowerCase().includes(productType.toLowerCase())) return item;
        });
      }
      setProducts(filteredProducts);
    },[searchQuery, productType]);

    return (
        <div>
          <div>
            <label>Search product:</label>
            <input type="search" name="product" onChange={(event: InputEvent) => setSearchQuery(event.target.value)}/>
          </div>
          <div>
            <label>Filter product:</label>
            <select name="product" id="grocery" onChange={(event: InputSelectEvent) => setProductType(event.target.value)}>
              <option value="allItems">All items</option>
              <option value="drinks">Drinks</option>
              <option value="fruit">Fruits</option>
              <option value="bakery">Bakery</option>
            </select>
          </div>
          <table>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
            {
              products.map((item, index) => {
                return (
                  <tr>
                    <td>{item?.type}</td>
                    <td>{item?.name}</td>
                    <td>{item?.price}</td>
                  </tr>
                )
              })
            }
          </table>
        </div>
    );
};

export default List;