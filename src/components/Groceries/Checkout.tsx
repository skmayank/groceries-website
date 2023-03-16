import React, { useState, useEffect } from "react";

//COMPONENT
import Header from "../common/header";

//API
import {
  getCartDataFromLocalStorage,
  setCartDataToLocalStorage,
  getTotalAmount,
  searchAndFilterData
} from "../../utils/utils";

//Types
import { ProductTypes, InputEvent } from "./List.types";

const Checkout = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [defaultProducts, setDefaultProducts] = useState<ProductTypes[]>([]);
  const [searchQuery, setSearchQuery] = useState<String>("");

  useEffect(() => {
    //@ts-ignore
    let localStorageCartData = getCartDataFromLocalStorage("cartData")
      ? //@ts-ignore
        JSON.parse(getCartDataFromLocalStorage("cartData"))
      : [];
    setProducts(localStorageCartData);
    setDefaultProducts(localStorageCartData);
  }, []);

  //SET THE FORMATTED DATA TO LOCALSTORAGE
  const resetFormattedStatesData = (data:any , key:any)  => {
    setProducts(data)
    setCartDataToLocalStorage(data, key)
  }

  const AddOrRemoveQuantity=(item:any, flag:boolean) => {
    //@ts-ignore
    const newLocalStorageValue = [];
    products.map((obj: any) => {
      if (obj.name === item.name) {
        if(flag === true) {
          obj.totalItemAdded = obj.totalItemAdded
          ? obj.totalItemAdded + 1
          : 1 + 1 ;
        }
        if(flag === false) {
          obj.totalItemAdded = obj.totalItemAdded
          ? obj.totalItemAdded - 1
          : 1 - 1;
        }
      }
      newLocalStorageValue.push(obj);
    });
    //@ts-ignore
    return newLocalStorageValue;
  }

  const handleAddItem = (item: any) => {
    const res = AddOrRemoveQuantity(item, true)
    resetFormattedStatesData(res, "cartData")
  };

  //HANDLE FUNCTION TO REMOVE QUANTITY FROM CART
  const handleRemoveItem = (item: any) => {
    const res = AddOrRemoveQuantity(item, false)
    resetFormattedStatesData(res, "cartData")
  };

  //HANDLE FUNCTION TO REMOVE FROM CART
  const handleRemoveFromCart = (item: any) => {
    let localStorageCartData = getCartDataFromLocalStorage("cartData")
      ? //@ts-ignore
        JSON.parse(getCartDataFromLocalStorage("cartData"))
      : [];
    let existedToLocalStorage = localStorageCartData.filter(
      (obj: any) => obj.name !== item.name
    );
    //@ts-ignore
    resetFormattedStatesData(existedToLocalStorage, "cartData")
  };

  //FILTER DATA BY SELECT AND SEARCH
  React.useMemo(() => {
    let filteredProducts = defaultProducts || [];
    filteredProducts = searchAndFilterData(filteredProducts, searchQuery, "")
    setProducts(filteredProducts);
  }, [searchQuery]);

  //@ts-ignore
  return (
    <div data-testid="groceries-checkout-id">
      <div className="container">
        {/*@ts-ignore*/}
        <Header
          //@ts-ignore
          onInputChange={(event: InputEvent) =>
            setSearchQuery(event.target.value)
          }
          showFilter={false}
        />
      </div>
      <div className="container">
        <div className="w-100">
          <div className="cart-head">
            <h1 className="titlepage text-start">Checkout</h1>
            <div className="table-box-product-cart">
              {products.map((item: any, index: number) => {
                const itemLeft = item.available - (item.totalItemAdded || 1);
                return (
                  <div className="cart-list">
                    <div className="cart-img">
                      <div className="img-cart">
                        <img src={item?.img} alt="" />
                      </div>
                      <div className="cart-text">
                        <h3>{item?.name}</h3>
                        <p>{item?.description}</p>
                      </div>
                    </div>
                    <div className="box-plus">
                      <div className="cart-number">
                        <img
                          src="images/minus.svg"
                          onClick={() => handleRemoveItem(item)}
                          alt=""
                        />
                        <span>{item?.totalItemAdded || 1}</span>
                        <img
                          src="images/plus.svg"
                          onClick={() => itemLeft !== 0 && handleAddItem(item)}
                          alt=""
                        />
                      </div>
                      {itemLeft !== 0 && (
                        <span
                          className={`label-tags ${
                            itemLeft >= 10 && "available"
                          }`}
                        >
                          {itemLeft < 10 ? `${itemLeft} left` : "Availale"}
                        </span>
                      )}
                    </div>

                    <div className="prize-cart">{item.price}</div>

                    <div
                      className="close-cart"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <img src="images/close.svg" alt="" />
                    </div>
                  </div>
                );
              })}
            </div>
            {products.length ? (
              <div className="table-box-cart">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>£{(getTotalAmount(products).subTotal).toFixed(2)}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>£{(getTotalAmount(products).discount).toFixed(2)}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>£{(getTotalAmount(products).total).toFixed(2)}</td>
                      <td>
                        <div className="checkout-btn">
                          Checkout
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
