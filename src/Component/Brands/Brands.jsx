import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../utils/BaseUrl.js'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading.jsx'

export default function Brands() {


  let [brands, setBrands] = useState([])
  let [brandsData, setBrandsData] = useState("")
  let [loading, setLoading] = useState(true)



  useEffect(() => {
    getAllBrands()
  }, [])



  function getAllBrands() {
    axios.get(`${BaseUrl}/brands`).then((data) => {
      setBrandsData(data.data)
      setBrands(data.data.data)
      setLoading(false)

    }).catch((err) => {
   
    })
  }
  return (
    <>
      {loading ? <Loading /> : null}
      <div className="container">
        <div className="row my-4 g-3 ">
          
          {brandsData.results == 0 ? <h2>Coming Soon.....</h2> :""}
          {brands?.map((e) => {
            return <div className="col-md-4  ">
              <Link to={'/branddetails/' + e._id}>
                <div className='border border-dark  border-2 rounded-3 shadow text-center'>
                  <img src={e.image} className='w-100' alt="" srcset="" />

                </div>
              </Link>
            </div>
          }
          )}
        </div>
      </div>

    </>
  )
}
