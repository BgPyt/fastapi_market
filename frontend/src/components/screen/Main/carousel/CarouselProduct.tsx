import React, { useEffect, useState } from 'react'
import Product from './Product'
import './Carousel.css'
import { SwiperSlide, Swiper, SwiperClass } from 'swiper/react'
import {Navigation} from 'swiper/modules'
import 'swiper/css'
import CarouselNavButton from './CarouselNavButton'
import { EnumTypeItem } from '@type/enum'
import CarouselTypeItem from './CarouselTypeItem'
import { useAxios } from '@hooks/useAxios'
import { ProductAPI } from '@http/service'
import { Iitem } from '@type/types'
import Loader from '@components/shared/loader/Loader'

const CarouselProduct = () => {
  const [beginningAndEnd, setBeginningAndEnd] = useState(
    {isBeginning: true, isEnd: false})
  const [typeItem, setTipeItem] = useState<EnumTypeItem>(EnumTypeItem.BestSeller)
  const [items, setItems] = useState([])
  const [getItems, isLoading] = useAxios(async () => {
    const response = await ProductAPI.fetchTypeProducts(typeItem)
    setItems(response)
  })

  useEffect(() => {
    getItems()
    setBeginningAndEnd({isBeginning: true, isEnd: false})
  }, [typeItem])

  function NavDisabled(swiper: SwiperClass) {
    if (swiper.isBeginning) {
      setBeginningAndEnd({isBeginning: true, isEnd: false})
    }
    else if (swiper.isEnd) {
      setBeginningAndEnd({isBeginning: false, isEnd: true})
    }
    else {
      setBeginningAndEnd({isBeginning: false, isEnd: false})
    }
  }

  return (
    <div className='carousel-block'>
        <div className='wrapper'>
            <CarouselTypeItem setTypeItem={setTipeItem} typeItem={typeItem}/>
            {isLoading ? <Loader height='392px' position='relative' backgroundColor=''/> :
            <Swiper
            spaceBetween={40}
            className='carousel'
            onSlideChange={(swiper: SwiperClass) => NavDisabled(swiper)}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              650: {
                slidesPerView: 2,
              },
              985: {
                slidesPerView: 3,
              },
              1268: {
                slidesPerView: 4,
                spaceBetween: 20
              }
            }}
            slidesPerView={4}>
              <CarouselNavButton beginningAndEnd={beginningAndEnd}/> 
                  {items.map((item: Iitem) => 
                  <SwiperSlide key={item.id} className='carousel-swiper'><Product item={item}/></SwiperSlide>)}
            </Swiper>}
        </div>
    </div>
  )
}

export default CarouselProduct
