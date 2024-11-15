import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const UserApi = (token) => {

  const [isLogged,setIsLogged]= useState(false)
  const [isAdmin,setIsAdmin]= useState(false)
  const [cart,setCart]= useState([])
  const [Data,setData]=useState('')
  useEffect(()=>{
    if(token){
      const getUser = async()=>{
        try{
          const res = await axios.get('https://car-rms-backend.vercel.app/user/infor',{ headers:{Authorization:token}})
          setIsLogged(true)
          res.data.role===1 ? setIsAdmin(true):setIsAdmin(false)
          setData(res.data.name)
        }
        catch(err){
        alert(err.response.data.msg)
        }
      }
      getUser()
    }
  },[token])

  const addCart = async(product)=>{
    if(!isLogged)
      return alert('please Login In')
  
  const check= cart.every(item =>{
      return item.id !== product._id
  })

  if(check){
    setCart([...cart,{...product,quantity:1}])
  }
  else{
    alert("This product has been already to cart")
  }
}
  return {
      isLogged:[isLogged,setIsLogged],
      isAdmin:[isAdmin,setIsAdmin],
      cart:[cart,setCart],
      res:[Data,setData],
      addCart:addCart
  };
}

export default UserApi
