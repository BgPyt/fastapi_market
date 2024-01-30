import { EnumTypeItem } from "@type/enum";
import { useState } from "react";


export const useAxios = (callback: () => Promise<void>) => {
    const [isLoad, setIsLoad] = useState(true)

    const axios = async () => {
        try {
            setIsLoad(true)
            await callback()
        } finally {
            setIsLoad(false)
        }
    }
    return [axios, isLoad] as const;
}