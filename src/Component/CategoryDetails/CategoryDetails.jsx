import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BaseUrl } from '../../utils/BaseUrl.js'
import Loading from '../Loading/Loading.jsx'

export default function CategoryDetails() {

    let [catDetails, setCatDetails] = useState(null)
    let { _id } = useParams()
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        getCatDetails(_id)
    }, [_id])
    function getCatDetails(id) {
        axios.get(`${BaseUrl}/categories/${id}`).then((data) => {
            setCatDetails(data.data.data)
            setLoading(false)
        })
    }
    return (
        <>
            {loading ? <Loading /> : null}

            <div className="container my-5">
        <div className="row justify-content-center align-items-center">
            <div className="col-md-6  ">
                <img src={catDetails?.image} className='w-100 border border-2 rounded-3 border-dark' alt="" srcset="" />
            </div>
            <div className="col-md-6  ">
                
                <h2>Name : {catDetails?.name}</h2>
                <h2>Slug : {catDetails?.slug}</h2>
            </div>
        </div>
       </div>
        </>
    )
}
