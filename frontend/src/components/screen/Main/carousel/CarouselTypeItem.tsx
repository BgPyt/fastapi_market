import { EnumTypeItem } from '@type/enum'
import React, { FC } from 'react'
import './Carousel.css'

interface ICarouselTypeItem {
  setTypeItem: React.Dispatch<React.SetStateAction<EnumTypeItem>>
  typeItem: EnumTypeItem
}

const CarouselTypeItem: FC<ICarouselTypeItem> = ({setTypeItem, typeItem}) => {
  return (
    <div className='type_button_block'>
      <button className='type_button' 
      onClick={() => {setTypeItem(EnumTypeItem.BestSeller)}}
      disabled={typeItem == EnumTypeItem.BestSeller ? true : false}>Лучшая цена</button>
      <button className='type_button' 
      onClick={() => setTypeItem(EnumTypeItem.New)}
      disabled={typeItem == EnumTypeItem.New ? true : false}>Новинки</button>
      <button className='type_button' 
      onClick={() => setTypeItem(EnumTypeItem.Sale)}
      disabled={typeItem == EnumTypeItem.Sale ? true : false}>Хит продаж</button>
    </div>
  )
}

export default CarouselTypeItem
