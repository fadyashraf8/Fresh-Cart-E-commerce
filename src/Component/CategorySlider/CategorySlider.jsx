import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

import { BaseUrl } from '../../utils/BaseUrl.js'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CategorySlider() {


  const [categories, setCategories] = useState([])
  useEffect(() => {
    getAllCategories()
  }, [])

  const getAllCategories = async () => {
    let { data } = await axios.get(`${BaseUrl}/categories`)
    setCategories(data.data)
  
  }


  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplay:true,
    autoplayspeed:3000,
  };


  return (
    <>

      <div className='container mt-5 my-5' >
        <h2 className='mb-3'>Shop Popular Categories</h2>
        <Slider {...settings} >
            {categories.map((e)=>{

           return <div key={e._id}>
            <LazyLoadImage src={e.image} alt="" className='w-100' height={200} />
            <h6>{e.name}</h6>
           </div>
            }) }
         
        </Slider>
      </div>
    </>
  )
}
