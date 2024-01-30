import { TypeCityOption } from '@type/types'
import React, { FC, useEffect } from 'react'

interface Iselect {
    name: string,
    className: string
    optionArray: ReadonlyArray<TypeCityOption>
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void 
    defaultValue: string
}

const Select: FC<Iselect> = ({
  name,
  className, 
  optionArray, 
  onChange, 
  defaultValue}) => {

  return (
    <select 
      onChange={(event) => onChange(event)} 
      name={name} 
      className={className}
      defaultValue={defaultValue}>
        {optionArray.map((el) => 
        <option 
          key={el.city} 
          value={el.value} 
          >{el.city}
        </option>
        )}
    </select>
  )
}

export default Select
