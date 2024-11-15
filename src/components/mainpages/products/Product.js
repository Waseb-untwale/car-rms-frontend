import React, { useContext } from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductList from '../utils/ProductLists/ProductList'
const Product = () => {
  const state= useContext(GlobalState)
  const [products]= state.productAPI.products
  const [isAdmin]= state.UserAPI.isAdmin
  return (
    <div className='products'>

      { products.map((product)=>(
          <ProductList key={product.id} product={product} isAdmin={isAdmin}></ProductList>
      ))}
      
    </div>
  )
}

export default Product
