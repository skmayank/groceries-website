import React, { useState, useEffect } from "react";

//COMPONENT
import Header from "../common/header";

//API
import {
  getCartDataFromLocalStorage,
  setCartDataToLocalStorage,
  getTotalAmount,
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

  const handleAddItem = (item: any) => {
    //@ts-ignore
    const newLocalStorageValue = [];
    products.map((obj: any) => {
      if (obj.name === item.name) {
        obj.totalItemAdded = obj.totalItemAdded
          ? obj.totalItemAdded + 1
          : 1 + 1;
      }
      newLocalStorageValue.push(obj);
    });
    //@ts-ignore
    setProducts(newLocalStorageValue);
    //@ts-ignore
    setCartDataToLocalStorage(newLocalStorageValue, "cartData");
  };

  //HANDLE FUNCTION TO REMOVE QUANTITY FROM CART
  const handleRemoveItem = (item: any) => {
    //@ts-ignore
    const newLocalStorageValue = [];
    products.map((obj: any) => {
      if (obj.name === item.name) {
        obj.totalItemAdded = obj.totalItemAdded
          ? obj.totalItemAdded - 1
          : 1 - 1;
      }
      newLocalStorageValue.push(obj);
    });
    //@ts-ignore
    setProducts(newLocalStorageValue);
    //@ts-ignore
    setCartDataToLocalStorage(newLocalStorageValue, "cartData");
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
    setProducts(existedToLocalStorage);
    //@ts-ignore
    setCartDataToLocalStorage(existedToLocalStorage, "cartData");
  };

  //FILTER DATA BY SELECT AND SEARCH
  React.useMemo(() => {
    let filteredProducts = defaultProducts || [];
    if (searchQuery !== "" && searchQuery) {
      filteredProducts = filteredProducts.filter((item) => {
        if (item?.name.toLowerCase()?.includes(searchQuery?.toLowerCase()))
          return item;
      });
    }
    setProducts(filteredProducts);
  }, [searchQuery]);

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
            <h1 className="titlepage">Checkout</h1>
            <div className="table-box-product-cart">
              {products.map((item: any, index: number) => {
                const itemLeft = item.available - (item.totalItemAdded || 1);
                return (
                  <div className="cart-list">
                    <div className="cart-img">
                      <div className="img-cart">
                        <img src="images/image-2.jpg" alt="" />
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
                      <td>£{getTotalAmount(products).subTotal}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>£{getTotalAmount(products).discount}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>£{getTotalAmount(products).total}</td>
                      <td>
                        <a href="#" className="checkout-btn">
                          Checkout
                        </a>
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
