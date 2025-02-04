import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BaseUrl } from './../../utils/BaseUrl';
import Product from '../Product/Product.jsx';

import Loading from '../Loading/Loading.jsx';

export default function Products() {


  let [loading, setLoading] = useState(true)

  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProducts()
  }, [])

  async function getAllProducts() {
    let { data } = await axios.get(`${BaseUrl}/products`)
    setProducts(data.data)
    setLoading(false)
  }

  return (
    <>
      {loading ? <Loading /> : null}
      <div className='container'>
        <div className="row">

          {products.map((e) => {

            return <Product e={e} />
          })}



        </div>
      </div>
    </>
  )
}
