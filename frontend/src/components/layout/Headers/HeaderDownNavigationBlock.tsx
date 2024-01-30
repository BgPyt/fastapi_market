import React, { FC } from 'react'
import { IdependSubcategories } from '../../../type/types';
import style from "./headers.module.css"
import { Link } from 'react-router-dom';
import CarouselNavButton from '../../screen/Main/carousel/CarouselNavButton';

const HeaderDownNavigationBlock: FC<IdependSubcategories> = ({mainSubcategory, dependSubcategories}) => {
    const category = mainSubcategory.category
    const lastSlice = dependSubcategories.length > 5 
    ? 5
    : dependSubcategories.length
  return (
    <div className={style.menu_2_back_wraper_subcategory}>
        <div className={style.menu_2_back_wraper_subcategory_main}>
            <Link className={style.menu_2_back_wraper_subcategory_main_a} 
            to={'catalog/' + mainSubcategory.slug} 
            >{mainSubcategory.name}
            </Link>
        </div>
        <ul className={style.menu_2_back_wraper_subcategory_ul}>
            {dependSubcategories.slice(0, lastSlice).map(((subcategory, index) => 
            <li key={subcategory.id}>
                <Link 
                    className={style.menu_2_back_wraper_subcategory_ul_a} 
                    to={'catalog/' + subcategory.slug}
                    >
                {subcategory.name}
                </Link>
            </li>
            ))}
        </ul>
        {dependSubcategories.length > 5
        ? <Link 
        className={style.menu_2_back_wraper_subcategory_other_subcategory} 
        to={'catalog/' + mainSubcategory.slug}
        >Все товары</Link>
        : null}
      
    </div>
  )
}

export default HeaderDownNavigationBlock
