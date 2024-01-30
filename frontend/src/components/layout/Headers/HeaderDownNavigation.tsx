import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import style from './headers.module.css'
import { CategoryAPI } from '../../../http/service'
import HeaderDownNavigationBlock from './HeaderDownNavigationBlock'
import { Icategory, Isubcategory } from '../../../type/types'
import { Link } from 'react-router-dom'
import { slugify } from 'transliteration';

interface Isubcategories {
  0: Isubcategory,
  1: Isubcategory[]
}

const HeaderDownNavigation: FC<{selectCategory: string}> = ({selectCategory})=>  {
  const [subcategories, SetSubcategories] = useState([])
  const [categorySlug, setCategorySlug] = useState('')

  useMemo(async () => {
    const result = await CategoryAPI.fetchSubcategories(selectCategory)
    SetSubcategories(result.data)
    setCategorySlug(result.headers['category_slug'])
  }, [selectCategory])


  return (
    <div id="menu_2" className={style.head_down_show_menu_container}>
        <div className={style.menu_2_back_wraper}>
            <div className={style.menu_2_category_header}>
                <div className={style.menu_2_category_header_title} id="menu_2_category_name">
                  {selectCategory}
                </div>
                <Link 
                to={"catalog/" + categorySlug}
                className={style.menu_2_category_header_link_content} id="menu_2_subcategory_length">
                  {`${subcategories.length} Категорий`}
                </Link>
            </div>
            <div 
            className={style.menu_2_back_wraper_content}      id="back_wraper_content">  
            {subcategories.map((subcategory) => {
            return <HeaderDownNavigationBlock key={subcategory[0]['name']} mainSubcategory={subcategory[0]} dependSubcategories={subcategory[1]}/>
          }
            )}
            </div>
        </div>
    </div>
  )
}

export default HeaderDownNavigation
