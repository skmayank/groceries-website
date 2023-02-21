import React,{useEffect, useState} from 'react';

//COMPONENT
import Header from '../common/header';

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
          {/* <div>
            <label>Search product:</label>
            <input type="search" name="product" onChange={(event: InputEvent) => setSearchQuery(event.target.value)}/>
          </div> */}
          {/* <div>
            <label>Filter product:</label>
            <select name="product" id="grocery" onChange={(event: InputSelectEvent) => setProductType(event.target.value)}>
              <option value="allItems">All items</option>
              <option value="drinks">Drinks</option>
              <option value="fruit">Fruits</option>
              <option value="bakery">Bakery</option>
            </select>
          </div> */}
          {/* <table>
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
          </table> */}
          <Header 
            //@ts-ignore
            onInputChange={(event: InputEvent) => setSearchQuery(event.target.value)}
            onSelectChange={(event: InputSelectEvent, key:String) => setProductType(key)}
          />
          <div className="container">
          <div className="w-100">
            <h1 className="titlepage">Trending Items</h1>
            <div className="product-box">
              <div className="row">
                {
                  products.map((item, index) => {
                    return(
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-12">
                        <div className="product">
                          <div className="product-img">
                            {/*@ts-ignore*/}
                            <img src={item?.img} />
                          </div>
                          <div className="product-bottom">
                            <h3>{item?.name}</h3>
                            <p>{item?.description}</p>
                            <div className="prize-box">
                              <span className="label-tags">Only 5 left</span>
                              <span className="d-flex w-100">
                                <span className="prize-number">{item?.price}</span> 
                                <span className="d-flex gap-3 align-items-center ms-auto">
                                  <img className="w-20" src="images/cart-product.svg" />
                                  <img className="w-20" src="images/cart-love.svg" />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>   
      </div>
    );
};

export default List;