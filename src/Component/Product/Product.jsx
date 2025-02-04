import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './../../Context/CartContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Product({ e }) {

    let { addToCart, deleteFromCart, addToWishList, deleteFromWishList } = useContext(CartContext)


    let [addCart, setAddCart] = useState(false)
    let [addWishList, setWishList] = useState(false)

    function changeAddCart() {
        setAddCart(prev => !prev)
    }
    function changeAddWishList() {
        setWishList(prev => !prev)
    }

    return (
        <>

            <div key={e._id} className='col-md-3 g-4 product p-3  rounded shadow-lg'>
                <div className='px-2 border  rounded-3'>
                    <Link to={"/productdetails/" + e._id}>
                        <LazyLoadImage src={e.imageCover} className='w-100' height={250} />
                    </Link>
                    <h6 className='text-main'>{e.category.name}</h6>
                    <p>{e.title.split(' ').slice(0, 2).join(' ')}</p>

                    <div className='d-flex justify-content-between align-items-center my-3 '>
                        <span>{e.price} EGP</span>
                        <div>
                            <i class="fa-solid fa-star rating-color"></i>
                            {e.ratingsAverage}
                        </div>
                    </div>

                    <div className='d-flex justify-content-end flex-column align-items-center  container' >
                        {addCart == false ?
                            <button onClick={() => {
                                changeAddCart(e)
                                addToCart(e._id)
                            }}
                                className='btn btn-sm w-100 text-white bg-main mt-1 ' >Add To Cart</button> :
                            <button onClick={() => {
                                changeAddCart(e)
                                deleteFromCart(e._id)
                            }} className='btn btn-sm w-100 text-white bg-danger mt-1  text-nowrap' >Remove From Cart</button>}


                        {addWishList == false ?
                            <button onClick={() => {
                                changeAddWishList(e)
                                addToWishList(e._id)
                            }} className={`btn btn-sm w-100 text-white bg-main mt-3  text-nowrap`} >Add To WishList</button> :
                            <button onClick={() => {
                                changeAddWishList(e)
                                deleteFromWishList(e._id)
                            }} className={`btn btn-sm w-100 text-white bg-danger mt-3 mb-4  text-nowrap`} >Remove From WishList</button>}
                    </div>








                </div>
            </div>

        </>
    )
}
