import React from 'react'
import { Link } from 'react-router-dom'
import Image from '@components/Image/Image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay} from 'swiper/modules'
import './SliderBanner.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'   
import 'swiper/css'

const SliderBanner = () => {
  const sliders = ['leafing_through_1.jpg', 'leafing_through_2.jpg', 'leafing_through_3.jpg', 'leafing_through.jpg']


  return (
    <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={40}
    slidesPerView={1}
    className='sample-slider'
    navigation
    pagination
    loop={true}
    autoplay={{ delay:2000 }}
    >
     {sliders.map((slider, index) => 
     <SwiperSlide key={index}>
      <img src={process.env.REACT_APP_API_STORAGE + slider}/>
     </SwiperSlide>)}
    </Swiper>


  )
}

export default SliderBanner
