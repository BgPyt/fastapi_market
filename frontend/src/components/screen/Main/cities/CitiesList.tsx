import React from 'react'
import {cities} from '@data/MarketList'
import { Icity, Imarket } from '@type/types'
import { Link } from 'react-router-dom'
import './CitiesList.css'



const CitiesList = () => {
  return (
    <div className='list-market'>
      <span className='description-makret'>Наши магазины</span>
      <div className='list-market-column-branches'>
        {cities.map((city) => 
        <div key={city.name}>
          <p className='main-market'>{city.name}</p>
          {city.markets.map((market) => 
          <div  key={market.street} className='info-market'>
            <Link to='/'><span>{market.street}</span></Link>
            <br/>
            <span>{city.start_phone + ' '}<span className='phone'>{market.phone}</span></span>
            <br/>
            <span>{market.info}</span>
          </div>
          )}
        </div>
        )}

      </div>
    </div>
  )
}

export default CitiesList
