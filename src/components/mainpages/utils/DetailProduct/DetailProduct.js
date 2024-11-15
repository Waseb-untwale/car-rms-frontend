import React, { useContext } from 'react'
import {Link, useParams} from 'react-router-dom'
import { useState } from 'react'
import {useEffect} from 'react'
import {GlobalState} from '../../../../GlobalState'
const DetailProduct = () => {

  const params= useParams()
  const state= useContext(GlobalState)
  const [products]= state.productAPI.products 

  const[detailProduct,setDetailProduct]= useState([])

  useEffect(()=>{
    if(params){
      products.forEach((product)=>{
        if(product._id=== params.id)
          return setDetailProduct(product)
      })
    }
  },[params,products])

  if(detailProduct.length ===0)
    return null

  
  return (
    <div className='detail'>
    <img src={detailProduct.images.url|| detailProduct.images} alt=''/>
    <div className='box-detail'>
      <div className='row'>
          <h2>{detailProduct.title}</h2>
          <h6>{detailProduct.product_id}</h6>
      </div>
      <span>${detailProduct.price}</span> 
      <p>{detailProduct.description}</p> 
      <p>{detailProduct.content}</p>
    </div>
  </div>
  )
}

export default DetailProduct
