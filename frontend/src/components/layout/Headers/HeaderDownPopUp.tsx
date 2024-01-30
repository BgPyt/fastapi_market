import React, { FC } from 'react'
import style from "./headers.module.css"
import Image from '../../Image/Image'
import { Link } from 'react-router-dom'
import './headers.module.css'

interface IChildren {
    name: string,
    href: string
}

interface IHeaderDownPopUp {
    name: string,
    href: string,
    childrenArray?: IChildren[] | []
    ImageSrc: string,
    ImageWidth?: string,
    ImageHeight?: string,
}

const ChildrenLink: FC<{name: string, href: string}> = ({name, href}) => {
    return (
        <Link to={href} className={style.head_down_other_pop_up_a}>
            <span className={style.head_down_other_pop_up_span}>{name}</span>
        </Link>
    )
}

const HeaderDownPopUp: FC<IHeaderDownPopUp> = ({
    name, 
    href,
    childrenArray=[], 
    ImageSrc,
    ImageHeight='',
    ImageWidth=''}) => {
  return (
    <div 
    className={[style.head_down_show_menu_market, style.show_menu].join(' ')}>
        <Link className={style.head_down_show_menu_a} to={href}>
             <Image
                 width="50px" 
                 height="45px" 
                 className={style.head_down_show_menu_img} 
                 src={ImageSrc}/>
            <span className={style.head_down_show_menu_word}>{name}</span>
        </Link>
        {childrenArray ?
            <div className={style.head_down_other_pop_up}>
                {childrenArray.map((children) => 
                <ChildrenLink key={children.name} name={children.name} 
                href={`${href}/${children.href}`}/>
                )}
            </div>
            : ''
        }
    </div>
  )
}
            

export default HeaderDownPopUp
