import React, {FC} from 'react'
import './Carousel.css'
import { Iitem } from '@type/types';
import { Link } from 'react-router-dom';

interface IproductComponent {
  item: Iitem
}

const Product: FC<IproductComponent> = ({item}) => {
  return (
    <div className='carousel-product'>
        <div className="product-block-up">
            <Link to={'catalog/' + item.id}>
                <img className="product-block-up-img" src={process.env.REACT_APP_API_SERVER + `${item.image._storage._path}/${item.image._name}`}/> 
            </Link>
         </div>
         <div>
             <div>
                <div className="product-code"><b>Код:</b> 000001</div>
                <Link to={'catalog/' + item.id}><div className="product-name">{item.name}</div></Link>
                <div className="product-price">{new Intl.NumberFormat("ru", {style: "decimal"}).format(item.price)} ₽</div>
            </div>
        </div>
    </div>
  )
}

export default Product
