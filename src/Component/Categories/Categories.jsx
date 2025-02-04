import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../utils/BaseUrl.js'
import Loading from '../Loading/Loading.jsx'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Categories() {

  let [categories, setCategories] = useState(null)
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()

  })

  function getCategories() {
    axios.get(`${BaseUrl}/categories`).then((data) => {
      setCategories(data.data.data)
      setLoading(false)
    })
  }
  return (
    <>
      {loading ? <Loading /> : null}

      <div className='container my-5'>
        <div className="row">
          {categories?.map((e) => {
            return <div className="col-md-3 g-3  p-3">
              <Link to={`/catdetails/` + e._id}>
                <div className='text-center'>
                  <LazyLoadImage src={e.image} className='w-100' height={300} alt="" />
                  <h4 className='text-main border border-1 border-dark'>{e.name}</h4>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>


    </>
  )
}
