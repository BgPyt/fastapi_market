import React, {FC} from 'react'
import { Ipicture } from '../../type/types'

const Image: FC<Ipicture> = ({src, className, alt='', width='', height=''}) => {
  return (
    <img src={src} width={width} height={height} className={className}/>
  )
}

export default Image
