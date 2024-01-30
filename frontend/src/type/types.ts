import Image from '@components/Image/Image';
import { EnumCity } from './enum';
export interface Ipicture {
    src: string,
    alt?: string,
    className?: string,
    width?: string,
    height?: string
}

export type Icategory = {
    id: number
    slug: string,
    name: string,
}

export type Isubcategory = {
    id: number,
    category_id: number,
    category: Icategory,
    name: string,
    slug: string,
    subcategories_id: null | number,
    subcategories_relationship: Isubcategory | null,
}

export interface IdependSubcategories {
    mainSubcategory: Isubcategory,
    dependSubcategories: Isubcategory[]
}

export interface Imarket {
    street: string
    phone: string
    info: string
}

export interface Icity {
    name: string
    start_phone: string
    markets: Imarket[]
    
}

export type Iitem = {
    characteristic: object
    id: number
    image: Iimage
    name: string
    price: number
    quantity: number
    subcategories_id: number
    type: string
    address: TypeStorage[]

}

export interface Iimage {
    _name: string
    _height: number
    _width: number
    _storage: {_path: string}

}

export interface IcategoryParams {
    categorySlug: string
    subcategorySlug: string
    subcategoryNestedSlug: string
}

export type Inavigation = {
    name: string
    slug: string
}

export type TypeOption = {
    name: string
    dataValue: string
}


export type TypeOptions = {
    name_asc: TypeOption
    popular: TypeOption
    name_desc: TypeOption
    price_desc: TypeOption
    price_asc: TypeOption
}

export type TypeFiltres = {
    sorted: string | null
    availability: string | null
    show: string | null
}

export type TypeRadio = {
    svg: JSX.Element
    value: string
}

export type TypeRadioButtons = {
    list: TypeRadio
    table: TypeRadio


}

export type TypeCityOption = {
    city: EnumCity
    value: string
}


export type TypeStorage = {
    id: number
    product: number
    address: number
    address_relationship: {city: string, tittle: string}
    quantity: number
}