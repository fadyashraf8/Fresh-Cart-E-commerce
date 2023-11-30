import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { BaseUrl } from '../../utils/BaseUrl.js'
import { toast } from 'react-toastify';

import { CartContext } from '../../Context/CartContext.js'
import { useNavigate } from 'react-router-dom';

export default function Checkout() {

  let navigate = useNavigate()

  let cartId = localStorage.getItem("cartId")
  const notify = (msg, type) => {
    toast[type](msg)
  };

  let { deleteCart, setCartItems } = useContext(CartContext)


  function cashPayment() {
    axios.post(`${BaseUrl}/orders/${cartId}`, {
      "shippingAddress": {
        "details": document.getElementById("details").value,
        "phone": document.getElementById("phone").value,
        "city": document.getElementById("city").value,
      }
    }, {
      headers: {
        "token": localStorage.getItem("token")
      }
    }).then((data) => {
      localStorage.setItem("cartNumbers", 0)
      setCartItems(0)
      sessionStorage.clear()
      notify("success", "success")
      deleteCart()
      navigate('/')
      window.location.reload()

    }).catch((err) => {
      notify("There is no cart for this user", "error")
    })
  }

  function onlinePayment() {
    axios.post(`${BaseUrl}/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
      "shippingAddress": {
        "details": document.getElementById("details").value,
        "phone": document.getElementById("phone").value,
        "city": document.getElementById("city").value,
      }
    }, {
      headers: { "token": localStorage.getItem("token") }
    }).then((data) => {
      localStorage.setItem("cartNumbers", 0)
      setCartItems(0)
      sessionStorage.clear()
      notify("success", "success")
      deleteCart()
      window.location.href=data.data.session.url
    }).catch((err) => {
      console.log(err);
      notify("There is no cart for this user", "error")
    })
  }



  return (
    <div className='container my-5'>

      <div className="row justify-content-center " >
        <h2>Shipping Address</h2>

        <div className='my-3 border border-1 border-dark rounded-5 p-4' >


          <label htmlFor="details" className='h4'>Address Details :</label>
          <input className='form form-control mt-2' required type="text" name="details" id="details" />

          <label htmlFor="phone" className='mt-2 h4'>phone :</label>
          <input className='form form-control mt-2' required type="text" name="phone" id="phone" />

          <label htmlFor="city" className='mt-2 h4'>city :</label>
          <input className='form form-control mt-2' required type="text" name="city" id="city" />

          <button onClick={cashPayment} className='btn bg-main my-3 text-white'>Cash Payment</button>
          <button onClick={onlinePayment} className='btn bg-main mx-3 text-white'>online Payment</button>

        </div>

      </div>
    </div>
  )
}
