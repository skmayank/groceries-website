import { useNavigate } from "react-router-dom";

//CONSTANTS
import { filterOption } from "../../utils/constants";

//UTILS
import { getCartDataFromLocalStorage } from "../../utils/utils";

//@ts-ignore
const Header = ({ onInputChange, onSelectChange, showFilter, productType="allItems" }) => {
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate("/checkout");
  };
  //@ts-ignore
  const localStorageCartData = getCartDataFromLocalStorage("cartData")
  //@ts-ignore
    ? JSON.parse(getCartDataFromLocalStorage("cartData"))
    : [];
  //@ts-ignore
  const localStorageLikedData = getCartDataFromLocalStorage("cartLikedData")
  //@ts-ignore
    ? JSON.parse(getCartDataFromLocalStorage("cartLikedData"))
    : [];
  return (
    <div className="container" data-testid="groceries-header-id">
      <header className="header header-margin">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <h4>GROCERIES</h4>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 text-center">
            <div className="serach-header">
              <input
                type="search"
                name="product"
                className="search-filds"
                placeholder="Search"
                onChange={onInputChange}
              />
              <img alt="" className="filter-img" src="images/filter.svg" />
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 ml-auto text-end col-12">
            <div className="useraccount">
              <div className="top-head-icon">
                <div>
                  <span className="number">{localStorageLikedData.length}</span>
                  <img alt="" className="w-35" src="images/heart.svg" />
                </div>
              </div>
              <div>
                <img alt="" className="w-35" src="images/avatar-top.svg" />
              </div>
              <div className="top-head-icon" onClick={handleRedirection}>
                <span className="number-blue">
                  {localStorageCartData.length}
                </span>
                <img alt="" className="w-35" src="images/cart.svg" />
              </div>
            </div>
          </div>
        </div>
        {showFilter && (
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="tags">
                <div className="filter-box">
                  <div className="filter-left">
                    <ul>
                      {filterOption.map((item, index) => {
                        return (
                          <li
                            key={index}
                            onClick={(event) => onSelectChange(event, item.key)}
                          >
                            <div className={productType === item.key ? "active" : ''}>{item.name}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
