import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'
import { Inavigation } from '@type/types'

interface InavigationComponent {
  mainNavigation: Inavigation 
  navigation: Inavigation[]
}


const Navigation: FC<InavigationComponent> = ({mainNavigation, navigation}) => {
  return (
    <div className='navigation-block'>
      <ul className='navigation-list'>
        <li className='main-page'><Link to='/'>Главная</Link></li>
        <li className='main-page'><Link to={mainNavigation.slug}>{mainNavigation.name}</Link></li>
        {navigation.map(category => 
          <li key={category.name} className='main-page'><Link to={'/catalog/' + category.slug}>{category.name}</Link></li>)}
      </ul>
    </div>
  )
}

export default Navigation
