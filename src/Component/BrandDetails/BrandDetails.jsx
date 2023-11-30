import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BaseUrl } from '../../utils/BaseUrl.js'
import Loading from '../Loading/Loading.jsx'

export default function BrandDetails() {

    let [brandDetails,setBrandDetails] = useState("")
    let { _id } = useParams()
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        getBrandDetails(_id)
      }, [_id])
    function getBrandDetails(id) {
        axios.get(`${BaseUrl}/brands/${id}`).then((data) => {

            console.log(data.data.data);
            setBrandDetails(data.data.data)
            setLoading(false)
        }).catch((err) => {
           
        })
    }

    return (
       <>
            {loading ? <Loading /> : null}
       <div className="container my-5">
        <div className="row justify-content-center align-items-center">
            <div className="col-md-6  ">
                <img src={brandDetails.image} className='w-100 border border-2 rounded-3 border-dark' alt="" srcset="" />
            </div>
            <div className="col-md-6  ">
                
                <h2>Name : {brandDetails.name}</h2>
                <h2>Slug : {brandDetails.slug}</h2>
            </div>
        </div>
       </div>
       </>
    )
}
