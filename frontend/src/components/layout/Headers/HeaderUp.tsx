import React from 'react'
import Image from '../../Image/Image'
import style from './headers.module.css';
import Select from '../../UI/select/Select';
import { useAppDispatch, useAppSelector } from '@service/store/hook';
import { EnumCity } from '@type/enum';
import { TypeCityOption } from '@type/types';
import { selectCity } from '@service/store/citySlice';



const HeaderUp = () => {
  const favourites = useAppSelector(state => state.favourite) 
  const city = useAppSelector(state => state.city) 
  const dispath = useAppDispatch()
  const cityOption: ReadonlyArray<TypeCityOption> = [
    {city: EnumCity.kem, value: "kem"},
    {city: EnumCity.nov, value: "nov"},
    {city: EnumCity.bel, value: "bel"},
    {city: EnumCity.len, value: "len"}
  ]

  function OnSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    dispath(selectCity({
        value: value, 
        city: EnumCity[value as keyof typeof EnumCity]}
    ))
  }


  return (
    <div className={style.head_up_length}>
            <div className={style.head_up}>
                <a href="/">
                  <Image 
                  src={process.env.REACT_APP_API_STORAGE + "service.png"} className={style.head_img}/>
                </a>
                <div className={style.head_center}>
                    <div className={style.head_city}>
                        <div>
                            Ваш город:
                        </div>
                        <Select 
                            name='dialog__city' 
                            className={style.city_select}   
                            optionArray={cityOption} 
                            onChange={OnSelect}
                            defaultValue={city.value}/>
                    </div>
                    <form className={style.search_form} method="get" action="/search/">
                        <input className={style.search_input} name="query" type="text"    placeholder="Поиск по товарам"/>
                        <button className={style.search_button} type="submit"></button>                        
                    </form>
                    <div className={style.order}>
                        <div>
                            <a href="tel:+78007558888">8 (800) 755-88-88</a>
                        </div>
                        <a className={style.order_phone_down}>Заказ по телефону</a>
                    </div>
                </div>
                <div className={style.head_profile}>
                    <a href="/user/login" className={style.h_profile_cabinet_a}>
                        <Image 
                        className={style.h_profile_cabinet} 
                        src={process.env.REACT_APP_API_STORAGE + "cabinet.png"}/>
                    </a>
                    <a href="/user/favourites" className={style.h_profile_favorites_a}>
                        <Image className={style.h_profile_favorites} src={process.env.REACT_APP_API_STORAGE + "favourites.png"}/>
                        <div className={style.h_profile_favorites_box}>
                            <div className={style.h_profile_favorites_counter}>
                                <span id="favourites-number" className={style.h_profile_favorites_number}>{favourites.item.length}</span>
                            </div>
                        </div>
                    </a>
                    <a href="/user/basket" className={style.h_profile_basket_a}>
                        <Image 
                        className={style.h_profile_basket} 
                        src={process.env.REACT_APP_API_STORAGE + "basket.png"}/>
                        <div className={style.h_profil_basket_label}>В корзине пусто</div>
                    </a>
                </div>
            </div>
        </div>
  )
}

export default HeaderUp
