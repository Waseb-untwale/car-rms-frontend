import React from 'react'
import Product from './products/Product'
import Cart from './cart/Cart'
import Login from './login/Login'
import Register from './login/Register'
import {Route,Routes} from 'react-router-dom'
import DetailProduct from './utils/DetailProduct/DetailProduct'
import Create_Product from './products/Create_Product'

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Product/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product' element={<Product></Product>}></Route>
        <Route path='/create_product' element={<Create_Product/>}/>
        <Route path='/create_product/:id' element={<Create_Product/>}/>
        <Route path = '/detail/:id' element={<DetailProduct/>}/> 
      </Routes>
      
    </div>
  )
}

export default Pages
