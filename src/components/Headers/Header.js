import React, { useContext } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from 'axios'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
const Header = () => {

  const state = useContext(GlobalState)
  const name=state.UserAPI.res[0].charAt(0)
  const [isLogged,setIsLogged]= state.UserAPI.isLogged
  const [isAdmin,setIsAdmin]= state.UserAPI.isAdmin;
  const [cart]= state.UserAPI.cart
  const navigate = useNavigate();
  const logOutUser= async()=>{
    await axios.get('https://car-rms-backend.vercel.app/user/logout')
    localStorage.clear()
    setIsLogged(false)
    setIsAdmin(false)
    navigate('/login')
  }
   const loggedRouter =()=>{
    return(
      <>
       <li><Link to='/create_product'>Create Product</Link></li>
      <li><Link to='/' onClick={logOutUser}>Logout</Link></li>
      </>
    )
  }
  return (
    <header>
      <div className="Menu">
        <MdOutlineMenu size={30} />
      </div>
      <div className="logo">
        <h3>
          <Link to="/">{isAdmin? <div className="profile"><p>{name}</p></div>:<div className="profile"><p>{name}</p></div>}</Link>
        </h3>
        profile
      </div>

      <ul>
        <li>
          <Link to="/">{isLogged? "Products":"Products"}</Link>
        </li>
        {isLogged ? loggedRouter() :  <li>
          <Link to="/login">Login or Register</Link>
        </li>}
       
        <li>
        <MdClose width={30} className="menu"/>
        </li>
      </ul>

    </header>
  );
};

export default Header;
