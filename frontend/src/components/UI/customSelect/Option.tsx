import React, { FC } from 'react'
import './Select.css'
import { useSearchParams } from 'react-router-dom'
import { TypeOption, TypeOptions } from '@type/types'

interface Ioption {
  options: TypeOptions
  setActiveOption: (option: TypeOption) => void
}

const Option: FC<Ioption> = ({options, setActiveOption}) => {
  return (
    <div className='select_list'>
      {Object.values(options).map((obj) => 
      <div key={obj.dataValue} 
      onClick={() => setActiveOption(obj)} className='select_item'>{obj.name}</div>
      )}
    </div>
  )
}

export default Option
