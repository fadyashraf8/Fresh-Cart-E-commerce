import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext.js'
import Loading from '../Loading/Loading.jsx'
import { Link } from 'react-router-dom'

export default function WishList() {


    let { getWishListItems, wishListProduct, wishListNumber, deleteFromWishList } = useContext(CartContext)
    let [loading, setLoading] = useState(true)



    async function deleteList(id) {
        await deleteFromWishList(id)

        localStorage.setItem(`plus-${id}`, "d-block")
        localStorage.setItem(`minus-${id}`, "d-none")

      
    }


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500);
        getWishListItems()
    }, [])

    return (
        <>
            {loading ? <Loading /> : null}

            <div className='my-3 row border border-3 rounded-5 p-4'>

                <div className="col-md-6">
                    <h1 className='text-main'>Number Of WishList Items : {wishListNumber}</h1>
                </div>
            </div>
            {wishListProduct?.map((e) => {

                return <div key={e._id} className="container">

                    <div className='row justify-content-center align-items-center border border-3 border-dark rounded-5 my-3 p-3'>
                        <div className='col-md-2'>
                            <Link to={'/productdetails/' + e._id}>
                                <img src={e.imageCover} className='w-100 border rounded-5 my-3' alt="" />
                            </Link>

                        </div>
                        <div className="col-md-8">
                            <h2 >{e.description}</h2>
                            <p className='text-main fs-4'>Price : {e.price}</p>
                            <span className='text-main'>Sold : {e.sold}</span>
                        </div>
                        <button onClick={() => deleteList(e._id)} className='btn btn-danger w-50 my-2'
                        >Remove From WishList
                            <i class="fa-solid fa-trash mx-2"></i></button>

                    </div>
                </div>
            })}




        </>
    )
}
