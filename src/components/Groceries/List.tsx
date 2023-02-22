import React,{useEffect, useState} from 'react';

//COMPONENT
import Header from '../common/header';

//API
import fetchProducts, {setCartDataToLocalStorage, getCartDataFromLocalStorage} from '../../utils/utils';

//Types
import { ProductTypes, InputEvent, InputSelectEvent } from './List.types';

const List = () => {

    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [defaultProducts, setDefaultProducts] = useState<ProductTypes[]>([]);
    const [searchQuery, setSearchQuery] = useState<String>("");
    const [productType, setProductType] = useState<String>("");
    const [showCartAlert, setShowCartAlert] = useState<Boolean>(false);
    const [alertMessage, setShowAlertMessage] = useState<String>("Already moved to cart");

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
    React.useMemo(() => {
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


    //HANDLE FUNCTION TO ADD CART
    const handleAddCard = (item:any) => {
      setShowCartAlert(true)
      //@ts-ignore
      const localStorageCartData = getCartDataFromLocalStorage("cartData") ? JSON.parse(getCartDataFromLocalStorage("cartData")) : [];
      let existedToLocalStorage = localStorageCartData.filter((obj:any) => obj.name === item.name);
      if(!existedToLocalStorage.length)  {
        const localData = [item, ...localStorageCartData];
        setCartDataToLocalStorage(localData, 'cartData');
        setShowAlertMessage('Moved to cart')
        setTimeout(function(){
          setShowCartAlert(false);
        }, 3000);
      }else {
        setShowAlertMessage('Already moved to cart')
        setTimeout(function(){
          setShowCartAlert(false);
        }, 3000);
      }
    }

    //HANDLE FUNCTION TO LIKE CART
    const handleLikedCard = (item: any) => {
      setShowCartAlert(true)
      //@ts-ignore
      const localStorageCartLikedData = getCartDataFromLocalStorage("cartLikedData") ? JSON.parse(getCartDataFromLocalStorage("cartLikedData")) : [];
      let notExistedToLocalStorage = localStorageCartLikedData.filter((obj:any) => obj.name === item.name);
      if(!notExistedToLocalStorage.length)  {
        const localData = [item, ...localStorageCartLikedData];
        setCartDataToLocalStorage(localData, 'cartLikedData');
        setShowAlertMessage('Status Updated')
        setTimeout(function(){
          setShowCartAlert(false);
        }, 3000);
      }else {
        let existedToLocalStorage = localStorageCartLikedData.filter((obj:any) => obj.name !== item.name);
        setCartDataToLocalStorage(existedToLocalStorage, 'cartLikedData');
        setShowAlertMessage('Status Updated')
        setTimeout(function(){
          setShowCartAlert(false);
        }, 3000);
      }
    }

    //@ts-ignore
    const localStorageCartLikedData = getCartDataFromLocalStorage("cartLikedData") ? JSON.parse(getCartDataFromLocalStorage("cartLikedData")) : [];

    const existedLikedCart = localStorageCartLikedData.map((a:any) => a.name);

    return (
        <>
          <Header 
            //@ts-ignore
            onInputChange={(event: InputEvent) => setSearchQuery(event.target.value)}
            onSelectChange={(event: InputSelectEvent, key:String) => setProductType(key)}
            showFilter={true}
          />
          <div className="container">
          <div className="w-100">
            <h1 className="titlepage">Trending Items</h1>
            <div className="product-box">
              <div className="row">
                {
                  products.map((item, index) => {
                    const isLiked = existedLikedCart.includes(item?.name);
                    return(
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-12" key={index}>
                        <div className="product">
                          <div className="product-img">
                            {/*@ts-ignore*/}
                            <img src={item?.img} />
                          </div>
                          <div className="product-bottom">
                            <h3>{item?.name}</h3>
                            <p>{item?.description}</p>
                            <div className="prize-box">
                              <span className={`label-tags ${item?.available >= 10  && 'available'}`}>{item?.available < 10 ? `Only ${item?.available} left` : 'Available'}</span>
                              <span className="d-flex w-100">
                                <span className="prize-number">{item?.price}</span> 
                                <span className="d-flex gap-3 align-items-center ms-auto">
                                  <img className="w-20" src="images/cart-product.svg" onClick={()=>handleAddCard(item)}/>
                                  <img className="w-20" src={!isLiked ?  "images/cart-love.svg" : "images/heart.svg"} onClick={() => handleLikedCard(item)}/>
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
              {
                showCartAlert && (
                  <div className="alert alert-success" role="alert">
                    {alertMessage}
                  </div>
                )
              }
            </div>
          </div>
        </div>   
      </>
    );
};

export default List;