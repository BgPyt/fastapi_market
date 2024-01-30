import React, { FC, useEffect, useState } from 'react'
import Option from './Option';
import './Select.css'
import { TypeOption, TypeOptions } from '@type/types';
import { useLocation, useSearchParams } from 'react-router-dom';


interface IcustomSelect {
    options: TypeOptions
    activeOption: {
      state: TypeOption, 
      setState: React.Dispatch<React.SetStateAction<TypeOption>>
    }
    defaultKey: string
}

const Select: FC<IcustomSelect> = ({options, activeOption, defaultKey}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()

    useEffect(() => {
      const searchSorted = searchParams.get('sorted')
      const sortedValue = searchSorted ? searchSorted : defaultKey;
      activeOption.setState(options[sortedValue as keyof TypeOptions])
    }, [location.pathname])

  return (
    <div className='select'>
        <div className='select_active' data-value={activeOption.state.dataValue}
        onClick={() => setIsOpen(!(isOpen))}>{activeOption.state.name}</div>
        {isOpen ? 
        <Option 
          options={options} 
          setActiveOption={(option: TypeOption) => {
            activeOption.setState(option)
            searchParams.set("sorted", option.dataValue)
            setSearchParams(searchParams);
            setIsOpen(false);
          }}/>
        : null}
        
    </div>
  )
}

export default Select
