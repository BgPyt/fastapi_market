import { TypeRadio, TypeRadioButtons } from '@type/types'
import React, { FC, useEffect, useRef } from 'react'
import './Radio.css'
import { URLSearchParamsInit, useLocation, useSearchParams } from 'react-router-dom'
import CSS from 'csstype';

interface IradioComponent {
  radioButtons: TypeRadioButtons
  setParams: (radio: TypeRadio) => void
  defaultKey: string
  style?: CSS.Properties
}

const Radio: FC<IradioComponent> = ({radioButtons, setParams, defaultKey, style}) => {
  const location = useLocation()
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [searchParams, setSearchParams] = useSearchParams()


  useEffect(() => {
    if (inputRefs && inputRefs.current) {
      const searchSorted = searchParams.get('show')
      const InputValue = searchSorted ? searchSorted : defaultKey;
      inputRefs.current.forEach(element => {
        element.checked = element.value === InputValue ? true : false
        }
      )
      }}
  , 
  [location.pathname])
  return (
    <div style={style} className='block_show_items'>
      {Object.values(radioButtons).map((radio, index) => 
      <div className='form_radio_btn' key={radio.value}>
        <input 
        ref={(el: HTMLInputElement) => inputRefs.current[index] = el} 
        onChange={() => {setParams(radio)}} id={`radio-${index + 1}`} name='radio' type='radio' value={radio.value} defaultChecked={index == 0 ? true : false}/>
        <label htmlFor={`radio-${index + 1}`}>{radio.svg}</label>
      </div>)}
    </div>
  )
}

export default Radio
