import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './components/Groceries/List'
import Checkout from './components/Groceries/Checkout';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="checkout" element={<Checkout />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
