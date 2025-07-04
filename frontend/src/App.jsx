import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home , Products , Navbar, AddProduct, UpdateProduct,ProductDetail } from './screen'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './auth/login'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer position='top-center'/>
    <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/products"} element={<Products/>}/>
      <Route path={"/add-product"} element={<AddProduct/>}/>
      <Route path={"/update-product/:id"} element={<UpdateProduct/>}/>
      <Route path={"/product-detail/:id"} element={<ProductDetail/>}/>
      <Route path={"/auth/login"} element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App