import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../utils/BaseUrl.js'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext.js'
import { toast } from 'react-toastify';

import Loading from '../Loading/Loading.jsx'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function ProductDetails() {

  const notify = (msg, type) => {
    toast[type](msg)
  };
  let { id } = useParams()

  let { addToCart, deleteFromCart, addToWishList, deleteFromWishList } = useContext(CartContext)
  let [loading, setLoading] = useState(true)



  const [productDetails, setProductDetails] = useState()

  useEffect(() => {
    getProductDetails(id)
  }, [id])





  async function getProductDetails(productId) {

    let { data } = await axios.get(`${BaseUrl}/products/${productId}`)
    setProductDetails(data.data)
    setLoading(false)
  }


  return (
    <>
      {loading ? <Loading /> : null}

      {productDetails == null ? "" : <div className="container my-5">
        <div className="row ">
          <div className="col-md-1">

          </div>
          <div className="col-md-4 ">
            <LazyLoadImage src={productDetails.imageCover} className='w-100 shadow-lg' alt="" />
          </div>
          <div className="col-md-7 d-flex flex-column justify-content-center border border-secondary-subtle border-opacity-100 rounded-5 my-5 " >
            <h2 className='mt-3'>{productDetails.title}</h2>
            <p>{productDetails.description}</p>
            <span className='text-main my-2'>{productDetails.category.name} </span>
            <div className="row my-3">
              <div className="col-md-6 ">
                <p>{productDetails.price} EGP</p>
              </div>
              <div className="offset-2 col-md-4 ">
                <p><i class="fa-solid fa-star rating-color"></i> {productDetails.ratingsAverage} | {productDetails.ratingsQuantity} Ratings </p>
              </div>
            </div>
            <div className=' d-flex flex-column justify-content-center align-items-center'>

              {/* <button id={'add-' + productDetails.id} className={`btn w-50 text-white bg-main mt-1  ${add} `} onClick={() => addCart(productDetails.id)}>Add To Cart</button>
              <button id={'remove-' + productDetails.id} className={`btn w-50 text-white bg-danger mt-1 ${remove ? remove : "d-none"} `} onClick={() => removeFromCart(productDetails.id)}>Remove From Cart</button>


              <button id={'plus-' + productDetails.id} className={`btn w-50 text-white bg-main mt-3 ${plus} `} onClick={() => addWishlist(productDetails.id)}>Add To WishList</button>

              <button id={'minus-' + productDetails.id} className={`btn w-50 text-white bg-danger mt-3 mb-4 ${minus ? minus : "d-none"} `} onClick={() => deleteWishlist(productDetails.id)}>Remove From WishList</button> */}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
