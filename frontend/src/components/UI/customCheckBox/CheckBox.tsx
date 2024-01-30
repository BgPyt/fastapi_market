import React, { FC, useEffect, useRef, useState } from 'react'
import './CheckBox.css'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import CSS from 'csstype'
import style from '@components/screen/Main/Main.module.css';


interface IcheckBoxComponent {
  name: string
  style?: CSS.Properties
}

const CheckBox: FC<IcheckBoxComponent> = ({name, style}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const inputRef = useRef<HTMLInputElement>(null)
    const statesChecked = {"off": true, "on": false}
    const location = useLocation();

    useEffect(() => {
        if (inputRef && inputRef.current) {
            const searchSorted = searchParams.get('availability')
            const checkedValue = searchSorted ? searchSorted : "on";
            inputRef.current.checked = statesChecked[checkedValue as keyof object]
        }
    }, [location.pathname])



  return (
    <div style={style}>
      <span className='checkbox_name'>{name}</span>
      <input 
      ref={inputRef} 
      onChange={(event) => {
        searchParams.set("availability", event.target.checked ? 'off' : "on")
        setSearchParams(searchParams)
      }} 
      type='checkbox' id='switch'></input>
      <label htmlFor='switch'></label>
    </div>
  )
}

export default CheckBox
