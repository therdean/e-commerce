import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className='main'>
          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
