import React from 'react'
import HeaderUp from './HeaderUp'
import HeaderDown from './HeaderDown'
import style from './headers.module.css';

const Headers = () => {
  return (
    <div className={style.header}>
      <HeaderUp/>
      <HeaderDown/>
    </div>
  )
}

export default Headers

