import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Register.css'
const Register = () => {
  const [user,setUser]= useState({
    name:'',
    email:'',
    password:''
  })

  const onChangeInput=(e)=>{
    const {name,value}=e.target;

    setUser({...user,[name]:value})

  }

  const registerSubmit= async(e)=>{
    e.preventDefault()
    try{
      await axios.post('https://car-rms-backend.vercel.app/user/register',{...user})

      localStorage.setItem('first',true)

      window.location.href='/'
    }
    catch(err){
        alert(err.response.data.msg)
    }
  }
  return (
    <div className='register-page'>
      <form onSubmit={registerSubmit}>

      <input type='text' name='name' required placeholder='Enter name' value={user.name}
        onChange={onChangeInput}
        />
        <input type='email' name='email' required placeholder='Enter Email' value={user.email}
        onChange={onChangeInput}
        />
        <input type='password' name='password' required placeholder='Enter Password' value={user.password}  onChange={onChangeInput}/>

        <div className='row'>
          <button type='submit'>Register</button>
          <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
