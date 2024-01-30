import { Iitem } from '@type/types'
import React, { FC, useEffect } from 'react'
import Item from './Item'
import './ItemList.css'
import { useAppDispatch, useAppSelector } from '@service/store/hook'
import { addOrDeleteItem } from '@service/store/favouritesSlice'
import { useLocation } from 'react-router-dom'

interface IitemListComponent {
  items: Iitem[]
}

const ItemsList: FC<IitemListComponent> = ({items}) => {
  const favourites = useAppSelector(state => state.favourite) 
  const dispath = useAppDispatch()
  console.log(items)

  return (
    <div className='itemlist'>
      {items.map(el => 
        <Item key={el.id} item={el} addFavorites={() => dispath(addOrDeleteItem(el.id))}/>  
        )}
    </div>
  )
}

export default ItemsList
