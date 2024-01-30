import { svgList, svgTable } from '@assets/svg/svg';
import CheckBox from '@components/UI/customCheckBox/CheckBox';
import Radio from '@components/UI/customRadioButt/Radio';
import Select from '@components/UI/customSelect/Select'
import React, { useEffect, useState } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import style from './FilterItems.module.css'

const sorted = {
  "name_asc": {name: "От А до Я", dataValue: "name_asc"},
  "popular": {name: "По популярности", dataValue: "popular"},
  "name_desc": {name: "От Я до А", dataValue: "name_desc"},
  "price_desc": {name: "Сначала дорогие", dataValue: "price_desc"},
  "price_asc": {name: "Сначала дешёвые", dataValue: "price_asc"}
}

const radio = {
  table: {svg:(svgTable), value: 'table'},
  list: {svg: (svgList), value: 'list'}
}


const FilterItems = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [options, setOptions] = useState(sorted)
  const [activeOption, setActiveOption] = useState({name: "По популярности", dataValue: "popular"})

  return (
    <div style={{display: "flex"}}>
      <Select options={options} activeOption={{state: activeOption, setState: setActiveOption}} defaultKey='popular'/>
      <CheckBox 
        style={{display: "flex", alignItems: "center", marginLeft: "10px"}} name={'В наличии:'}/>
      <Radio 
        radioButtons={radio} 
        setParams={(radio) => {
        setSearchParams((prev: URLSearchParams): URLSearchParamsInit  => {
          prev.set('show', radio.value);
          return prev
        }
        )}}
        defaultKey='table'
        style={{marginLeft: "auto"}}
        />
    </div>
  )
}

export default FilterItems