import React from 'react'
import Slider from "react-slick";

import silde1 from '../../imgs/mainslider imgs/1.jpeg'
import silde2 from '../../imgs/mainslider imgs/2.jpeg'
import silde3 from '../../imgs/mainslider imgs/3.jpeg'
import silde4 from '../../imgs/mainslider imgs/4.jpeg'
import silde5 from '../../imgs/mainslider imgs/5.jpeg'
import silde6 from '../../imgs/mainslider imgs/6.jpeg'

export default function MainSlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
 
 
  return (
    <>
    <div className='container mt-5'>
    <Slider {...settings} className='mt-3'>
      <div>
       <img src={silde1} alt=""  className='w-100'/>
      </div>
      <div>
      <img src={silde2} alt="" className='w-100'/>
      </div>
      <div>
      <img src={silde3} alt="" className='w-100'/>
      </div>
      <div>
      <img src={silde4} alt="" className='w-100'/>
      </div>
      <div>
      <img src={silde5} alt="" className='w-100'/>
      </div>
      <div>
      <img src={silde6} alt="" className='w-100'/>
      </div>
    </Slider>
    </div>
    
    </>
  )
}
