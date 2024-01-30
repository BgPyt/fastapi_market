import { svgLikeItem } from '@assets/svg/svg'
import { Iitem } from '@type/types'
import React, { FC } from 'react'
import './Item.css'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@service/store/hook'


interface IitemComponent {
  item: Iitem
  addFavorites: () => void
}

const Item: FC<IitemComponent> = ({item, addFavorites}) => {
  const city = useAppSelector(state => state.city)
  const favourites = useAppSelector(state => state.favourite) 

  function isAvailability() {
    var availability= <div className="product_availability product_availability_not">
      <span style={{color: 'black'}}>Нету в наличии</span>
    </div>
    item.address.some(element => {
      if (element.address_relationship.city === city.city 
          && 
          element.quantity > 0) {
            availability = <div 
            className="product_availability">
              <span style={{color: 'green'}}>Есть в наличии</span>
            </div>
            return true
      } 
      else if (element.quantity > 0) {
         availability = <div 
         className="product_availability product_availability_order">
          <span style={{color: 'black'}}>Под заказ (1-2 недели)</span>
        </div>
      }
    });
    return availability
  }
 


  return (
    <div className="product_block">
      <div className="product_block_up">
        <a href="/catalog/21">
           <img className="product_block_up_img" src={process.env.REACT_APP_API_SERVER + `${item.image._storage._path}/${item.image._name}`}/>
        </a>
        {svgLikeItem(favourites.item.includes(item.id), addFavorites)}
      </div>
      <div className="product_block_down">
        <div className="product_block_down_description">
          <div className="product_code"><b>Код:</b> 000001</div>
          <a href="/catalog/21">
            <div className="product_name">
              {item.name}
            </div>
          </a>
          {isAvailability()}
          <div className="product_price">{new Intl.NumberFormat("ru", {style: "decimal"}).format(item.price)} ₽</div>
        </div>
        <div className="product_add_basket">
          <button className="product_add_basket_button">
            <span>Добавить в корзину</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item
