import React from 'react'
import style from '@components/screen/Main/Main.module.css'
import Image from '@components/Image/Image'
import { Link, useSearchParams } from 'react-router-dom'
import SliderBanner from '@components/screen/Main/slider/SliderBanner'
import CitiesList from '@components/screen/Main/cities/CitiesList'
import CarouselProduct from '@components/screen/Main/carousel/CarouselProduct'

const Main = () => {
  return (
    <div>
      <div className={style.banner_block}>
      <div className={style.wrapper}>
        <div className={style.content}>
          <Link to='' 
          className={style.cersanit_banner}>
            <Image  
            src={process.env.REACT_APP_API_STORAGE + "advertisement_2.jpg"} 
            />
          </Link>
          <div className={style.center_banners}>
            <Link to='https://valtec.ru'
            className={style.cersanit_banner}>
              <Image    
              src={process.env.REACT_APP_API_STORAGE + '670x230_valtec.gif'} />
            </Link>
            <SliderBanner/>
          </div>
          <CitiesList/>
        </div>
      </div>
      </div>
      <CarouselProduct/>
    </div>
)}


export default Main
