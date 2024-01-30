import { svgLoader } from '@assets/svg/svg'
import React, { FC } from 'react'
import './Loader.css'

interface Iloader {
  width?: string 
  height?: string
  backgroundColor?: string
  position?: ("static" | "relative" | "absolute" | "sticky" | "fixed") 
}

const Loader: FC<Iloader> = (
  {width='100%', 
  height='100%', 
  backgroundColor='rgba(0, 0, 0, 0.329)', 
  position='fixed'}) => {
  return (
    <div 
    style={{height: height, width: width, backgroundColor: backgroundColor, position: position}} className='block_loader'>
      {svgLoader}
    </div>
  )
}

export default Loader
