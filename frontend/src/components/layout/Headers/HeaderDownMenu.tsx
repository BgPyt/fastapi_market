import React, { useEffect, useMemo, useState } from 'react'
import style from './headers.module.css'
import { CategoryAPI } from '../../../http/service'
import { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'
import Image from '../../Image/Image'
import HeaderDownNavigation from './HeaderDownNavigation'
import { useTimeCategory } from '../../../hooks/useTimeCategory'
import { Icategory } from '../../../type/types'




const HeaderDownMenu = () => {
    const [selectCategory, SetSelectCategory] = useState<string>('')
    const [categories, setCategories] = useState<Icategory[]>([])
    useEffect(() => {
        CategoryAPI.fetchCategories().then((data: Icategory[]): void =>
        setCategories(data)
        )
    }, [])

    const [SetTimeOutCategory, ClearTimeOutCategory] = useTimeCategory(SetSelectCategory)

  return (
    <div className={style.head_down_show_menu_catalog}>
        <a href="/catalog" className={style.head_down_show_menu_a}>
            <Image
            width="50px" 
            height="45px" 
            className={style.head_down_show_menu_img} 
            src={process.env.REACT_APP_API_STORAGE + "menu-bar.png"}/>
            <span className={style.head_down_show_menu_word}>Каталог</span>
        </a>
        <div className={style.head_down_catalog_pop_up} id="catalog_pop_up">
            <div className={style.head_down_catalog_pop_up_column}>
                {categories.map(categorie => 
                    <Link 
                        key={categorie.name}    
                        className={style.head_down_catalog_pop_up_a} 
                        to={`catalog/${categorie.slug}`}
                        state={{categorie: 
                        {name: categorie.name, slug: categorie.slug}}}>
                            <span
                            onMouseEnter={SetTimeOutCategory} 
                            onMouseLeave={ClearTimeOutCategory}
                            className={style.head_down_catalog_pop_up_span}>
                            {categorie.name}                          
                            </span>
                    </Link>
                )}
            </div>
            {selectCategory && <HeaderDownNavigation selectCategory={selectCategory}/>}
        </div>
    </div>
  )
}

export default HeaderDownMenu
