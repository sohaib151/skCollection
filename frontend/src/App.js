import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from './screens/HomeScreen'
import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UsersListScreen from "./screens/UsersListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
function App() {
  return (
    <Router>
    <Header/>
    <Container>
      <main className="my-3">
      <Routes>
        <Route path="/shipping" element={<ShippingAddressScreen/>}/>
        <Route path="/payment" element={<PaymentScreen/>}/>
        <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
        <Route path="/order/:id" element={<OrderScreen/>}/>
        <Route path="/login" element={<LoginScreen/>}/>
        <Route path="/profile" element={<ProfileScreen/>}/>
        <Route path="/register" element={<RegisterScreen/>}/>
        <Route path="/" element={<HomeScreen/>}/>
        <Route path="/search/:keyword" element={<HomeScreen/>}/>
        <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen/>}/>
        <Route path="/page/:pageNumber" element={<HomeScreen/>}/>
        <Route path='/products/:id' element={<ProductScreen/>}/>
        <Route path='/cart/:id' element={<CartScreen/>}/>
        <Route path='/cart' element={<CartScreen/>}/>
        <Route path='/admin/userslist' element={<UsersListScreen/>}/>
        <Route path='/admin/productlist' element={<ProductListScreen/>}/>
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>}/>
        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
        <Route path='/admin/orders' element={<OrderListScreen/>}/>
      </Routes>
      </main>
      </Container>
     <Footer/>
    </Router>
  );
}

export default App;
