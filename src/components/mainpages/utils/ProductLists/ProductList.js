import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {GlobalState} from '../../../../GlobalState'
import BtnRender from "./BtnRender";
import { MdDelete } from "react-icons/md";
import axios from 'axios'
const ProductList = ({ product,isAdmin}) => {
  const navigate = useNavigate();
  const deleteProduct= async(item)=>{
    const res= await axios.delete(`https://car-rms-backend.vercel.app/api/products/${item}`)
    navigate('/')
   }
  return (
    

    <>
     <div className="product_card">
      <img src={product.images.url || product.images} alt="" />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
    </div>
    </>

  );
};

export default ProductList;
