import React, { useContext } from 'react'
import logo from '../../imgs/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext.js'
import { CartContext } from '../../Context/CartContext.js'

export default function Navbar() {

  
  let { userData, logOut } = useContext(AuthContext)
  let { cartItems } = useContext(CartContext)


  return (
    <>


      <nav className="navbar navbar-expand-lg bg-main-light p-3">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">Brands</NavLink>
              </li>

            </ul>


          </div>


          <div className="collapse navbar-collapse" id="navbarSupportedContent">


            {userData != null ? <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link to='/cartItems'>
                  <button type="button" className="btn  position-relative">
                    Cart
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      {cartItems}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </Link>
              </li>
              <li className="nav-item ">
                <Link to='/wishList'>
                  <button type="button" className="btn  position-relative">
                    WishList
                    <i className="fa-solid fa-heart mx-2"></i>

                  </button>
                </Link>
              </li>
              <li className="nav-item me-1">
                <Link className="nav-link" onClick={logOut}>Logout</Link>
              </li>
            </ul> : <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
            </ul>}


          </div>
        </div>
      </nav>

    </>
  )
}
