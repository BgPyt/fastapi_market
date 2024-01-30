
import CategoryList from '@components/screen/Products/categoryList/CategoryList'
import FilterItems from '@components/screen/Products/filterItems/FilterItems'
import Navigation from '@components/screen/Products/navigation/Navigation'
import { useAxios } from '@hooks/useAxios'
import { CategoryAPI, ProductAPI } from '@http/service'
import { Icategory, Isubcategory, TypeFiltres } from '@type/types'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import style from '@components/screen/Main/Main.module.css';
import ItemsList from '@components/screen/Products/itemsList/ItemsList'

const Products = () => {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [filters, setFilters] = useState<TypeFiltres>({sorted: null, availability: null, show: null})
    const location = useLocation();
    const [items, setItems] = useState([])
    const [navigation, setNavigation] = useState([])
    const [subcategories, setSubcategories] = useState<Isubcategory[]>([])
    const [axiosItemsAndSub, isLoadItems] = useAxios(async () => {
        const responseItems = await ProductAPI.fetchProductsfilter(params)
        const responceSub = await CategoryAPI.fetchSubcategoryFilter(params)
        setItems(responseItems.data)
        setSubcategories(responceSub.data[0])
        setNavigation(responceSub.data[1])
      })
    

  

    useEffect(() => {
      searchParams.forEach((value, key, params) => {
        filters[key as keyof TypeFiltres] = value
      });
      setFilters(filters)
    }, [searchParams])
    

      useEffect(() => {
        axiosItemsAndSub()
      }, [location])

    
  return (
    <div>
      <Navigation 
        mainNavigation={{name: "Каталог", slug: '/catalog'}} 
        navigation={navigation}
      />
      <div 
        className='wrapper' 
        style={{flexDirection: "row", alignItems: 'normal', marginTop: "10px"}}>
        {subcategories.length ? <CategoryList style={{marginRight: "10px"}} subcategories={subcategories}/> : <></>} 
        <div 
          style={{display: "flex", flexDirection: "column", width: "100%"}}>
          <FilterItems/>
          <ItemsList items={items}/>
        </div>
      </div>
      
    </div>
  )
}

export default Products
