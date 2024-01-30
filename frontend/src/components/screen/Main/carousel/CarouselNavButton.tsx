import React, { useEffect, useState, FC } from 'react'
import { useSwiper } from 'swiper/react';
import './Carousel.css'
import {ArrowLeftShort, ArrowRightShort } from 'react-bootstrap-icons'
import { useCarouselButt } from '@hooks/useCarouselButt';
import 'swiper/css/navigation'

interface ICarouselNavButton {
  beginningAndEnd: {isEnd: boolean, isBeginning: boolean}
}

const CarouselNavButton: FC<ICarouselNavButton>= ({beginningAndEnd}) => {
    const swiper = useSwiper()

  return (
    <div className='carousel-navigation'>
      <button 
      onClick={() => swiper.slidePrev()} 
      className='carousel-navigation-prev carousel-navigation-button' 
      disabled={beginningAndEnd.isBeginning}
      >
      <ArrowLeftShort size={20}/>
      </button>
      <button onClick={() => swiper.slideNext()} className='carousel-navigation-next carousel-navigation-button'
      disabled={beginningAndEnd.isEnd}>
      <ArrowRightShort size={20}/>
      </button>
    </div>
  )
}

export default CarouselNavButton
