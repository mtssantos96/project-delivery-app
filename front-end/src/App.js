import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import OrderDetail from './pages/OrderDetail';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/customer/products" element={ <Products /> } />
          <Route path="/customer/checkout" element={ <Checkout /> } />
          <Route path="/customer/orders" element={ <Orders /> } />
          <Route
            path="/customer/orders/:id"
            element={
              <OrderDetail
                pageName="customer_order_details"
              />
            }
          />
          <Route path="/seller/orders" element={ <Orders /> } />
          <Route
            path="/seller/orders/:id"
            element={
              <OrderDetail
                pageName="seller_order_details"
              />
            }
          />
          <Route path="/admin/manage" element={ <Admin /> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
