import React from 'react'

//@ts-ignore
const Header = ({onInputChange, onSelectChange}) => {
    return (
        <div className="container">
            <header className="header header-margin">
              <div className="row align-items-center">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
                  <h4>GROCERIES</h4>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 text-center">
                  <div className="serach-header">
                      <input type="search" name="product" className="search-filds" placeholder="Search" onChange={onInputChange}/>
                      <img className="filter-img" src="images/filter.svg" />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 ml-auto text-end col-12">
                  <div className="useraccount"> 
                    <div className="top-head-icon"><a href="#"><span className="number">8</span><img className="w-35" src="images/heart.svg" /></a></div>
                    <a href="#"><img className="w-35" src="images/avatar-top.svg" /></a> 
                    <div className="top-head-icon"><a href="#"><span className="number-blue">8</span><img className="w-35" src="images/cart.svg" /></a></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="tags">
                    <div className="filter-box">
                      <div className="filter-left">
                        <ul>
                          <li onClick={(event)=>onSelectChange(event, "allItems")}><a href="#" className="active">All items</a></li>
                          <li onClick={(event)=>onSelectChange(event, "drinks")}><a href="#">Drinks</a></li>
                          <li onClick={(event)=>onSelectChange(event, "fruit")}><a href="#">Fruit</a></li>
                          <li onClick={(event)=>onSelectChange(event, "bakery")}><a href="#">Bakery</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
        </div>
    )
}

export default Header;
