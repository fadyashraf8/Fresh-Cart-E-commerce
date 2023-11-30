import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext.js'
import { toast } from 'react-toastify';
import { useState } from 'react'
import Loading from '../Loading/Loading.jsx';
import { Link } from 'react-router-dom';
import { BaseUrl } from '../../utils/BaseUrl.js';
import axios from 'axios';

export default function CartItems() {
    let { getCartItems, cartData, cartProduct, cartItems, deleteFromCart } = useContext(CartContext)
    let [loading, setLoading] = useState(true)

    const notify = (msg, type) => {
        toast[type](msg)
    };


    async function deleteCart(id) {
        await deleteFromCart(id)

        sessionStorage.setItem(`add-${id}`, "d-block")
        sessionStorage.setItem(`remove-${id}`, "d-none")

      
    }


    function updateCountNumber(id, numOfItem) {
        axios.put(`${BaseUrl}/cart/${id}`, {
            "count": numOfItem
        }, {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then((data) => {
            if (numOfItem == 0) {
                deleteFromCart(id)
                sessionStorage.setItem(`add-${id}`, "d-block")
                sessionStorage.setItem(`remove-${id}`, "d-none")
            }
            getCartItems()
            notify("Done!", 'success')

        }).catch((err) => {
            notify("error!", 'error')
        })
    }





    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500);
        getCartItems()

    }, [])



    return (
        <>
            {loading ? <Loading /> : null}

            <div className='my-3 row border border-3 rounded-5 p-4 justify-content-center align-items-center'>
                <div className="col-md-6">
                    <h1 className='text-main'>Total Price : {cartData?.data.totalCartPrice}</h1>
                </div>
                <div className="col-md-6">
                    <h1 className='text-main'>Number Of Cart Items : {cartItems}</h1>
                </div>
                <div className="mt-5">
                    {cartItems > 0 ? <Link to='/checkout'>
                        <button className='btn bg-main w-25 text-white'  >Checkout
                            <i class="fa-solid fa-cart-shopping mx-2"></i></button>
                    </Link> : <button className='btn bg-main w-25 text-white' disabled >Checkout
                        <i class="fa-solid fa-cart-shopping mx-2"></i></button>}

                </div>
            </div>

            <div className="container">
                {cartProduct?.map((e) => {

                    return  <div className='row justify-content-center align-items-center border border-3 border-dark rounded-5 my-3 p-3'>
                            <div className='col-md-2'>
                            <Link to={"/productdetails/" + e.product._id}>
                                <img src={e.product.imageCover} className='w-100 border rounded-5 my-3' alt="" />
                            </Link>
                            </div>
                            <div className="col-md-8">
                                <h2 >{e.product.title}</h2>
                                <p className='text-main fs-4'>Price : {e.price}</p>
                                <button className='btn btn-success mx-3' onClick={() => updateCountNumber(e.product._id, e.count + 1)}><i class="fa-solid fa-plus"></i></button>
                                <span className='h3'>{e.count}</span>
                                <button className='btn btn-danger mx-3' onClick={() => updateCountNumber(e.product._id, e.count - 1)}><i class="fa-solid fa-minus"></i></button>

                            </div>
                            <button className='btn btn-danger w-50 my-2'
                                onClick={() => deleteCart(e.product._id)} >Remove From Cart
                                <i class="fa-solid fa-trash mx-2"></i></button>

                        </div>
                

                })}
            </div>





        </>
    )
}
