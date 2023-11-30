import React from 'react'
import { Link } from 'react-router-dom'

export default function Product(props) {

    let { products } = props



    return (
        <>

            {products.map((e) => {
                return <div key={e._id} className='col-md-3 g-4 product p-3  rounded shadow-lg'>
                    <div className='px-2 border  rounded-3'>
                        <Link to={"/productdetails/" + e._id}>
                            <img src={e.imageCover} className='w-100' height={250} />
                            <h6 className='text-main'>{e.category.name}</h6>
                            <p>{e.title.split(' ').slice(0, 2).join(' ')}</p>

                            <div className='d-flex justify-content-between align-items-center my-3 '>
                                <span>{e.price} EGP</span>
                                <div>
                                    <i class="fa-solid fa-star rating-color"></i>
                                    {e.ratingsAverage}
                                </div>
                            </div>
                            <button className='btn bg-main w-100 text-white '>Product Details</button>
                        </Link>

                
                         
                    </div>
                </div>
            })}
        </>
    )
}
