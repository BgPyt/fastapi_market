import { Isubcategory } from '@type/types'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './CategoryList.css'
import CSS from 'csstype';

interface IcategoryListComponent {
  subcategories: Isubcategory[]
  style?: CSS.Properties
}

const CategoryList: FC<IcategoryListComponent> = ({subcategories, style}) => {
  return (
    <div style={style} className="categorylist">
      <div>Категории</div>
      <ul>
        {subcategories.map(el => 
          <li key={el.name}><Link to={`/catalog/${el.slug}`}>{el.name}</Link></li>)}
      </ul>
    </div>
  )
}

export default CategoryList
