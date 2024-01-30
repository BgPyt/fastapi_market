import React from 'react'
import style from "./headers.module.css"
import HeaderDownPopUp from './HeaderDownPopUp'
import HeaderDownMenu from './HeaderDownMenu'

const HeaderDown = () => {
  return (
    <div className={style.head_down}>
            <div className={style.head_down_center}>
                <HeaderDownMenu/>
                <HeaderDownPopUp
                  name='О компании' 
                  href='company'
                  ImageHeight='45px'
                  ImageWidth='50px'
                  ImageSrc={process.env.REACT_APP_API_STORAGE + "city.png"}
                  childrenArray={[
                    {name: 'Бренды', href: 'brands'}, 
                    {name: 'Сертификаты', href: 'certificates'}, 
                    {name: 'Вакансии', href: 'vacancy'}, 
                    {name: 'Гарантии', href: 'guarantees'}
                  ]}
                  />
                <HeaderDownPopUp
                  name='Новости'
                  href='news' 
                  ImageHeight='45px'
                  ImageWidth='50px'
                  ImageSrc={process.env.REACT_APP_API_STORAGE + "news.png"}
                  />
                <HeaderDownPopUp
                  name='Монтаж' 
                  href='mounting'
                  ImageHeight='45px'
                  ImageWidth='50px'
                  ImageSrc={process.env.REACT_APP_API_STORAGE + "tool.png"}
                  />
                <HeaderDownPopUp
                  name='Доставка' 
                  href='delivery'
                  ImageHeight='45px'
                  ImageWidth='50px'
                  ImageSrc={process.env.REACT_APP_API_STORAGE + "delivery-truck.png"}
                  />
                <HeaderDownPopUp 
                  name='Магазины'
                  href='market'
                  childrenArray={[ 
                    {name: 'Обратная связь', href: 'feedback'}, 
                  ]} 
                  ImageHeight='45px'
                  ImageWidth='50px'
                  ImageSrc={process.env.REACT_APP_API_STORAGE + "market.png"}/>
            </div>
        </div>
  )
}

export default HeaderDown
