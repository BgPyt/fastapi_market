import React, { useEffect } from 'react'
import Swiper from 'swiper'
import {useState} from 'react';

export const useCarouselButt = (swiper: Swiper) => {
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    useEffect(() => {setIsBeginning(swiper.isBeginning)
    console.log(isBeginning)}, [swiper.isBeginning])
    useEffect(() => {setIsEnd(swiper.isEnd)
        console.log(isEnd)}, [swiper.isEnd])

    return [isBeginning, isEnd]
}


