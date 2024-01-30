import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Headers from './components/layout/Headers/Headers'
import Main from '@pages/Main'
import Footer from './components/layout/Footer/Footer'
import {Provider} from 'react-redux'
import Catalog from '@pages/Catalog'
import Products from '@pages/Products'
import { persistor, store } from '@service/store/init'
import {PersistGate} from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Headers/>
            <Routes>
              <Route path='' element={<Main/>}/>
              <Route path="catalog">
                <Route index element={<Catalog/>}/>
                <Route 
                path=':category' element={<Products/>}/>
                <Route 
                path=':category/:subcategory' element={<Products/>}/>
                <Route 
                path=':category/:subcategory/:subcategory_1' element={<Products/>}/> 
              </Route>
            </Routes>
          <Footer/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
