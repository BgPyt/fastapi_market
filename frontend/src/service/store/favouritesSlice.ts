import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from './init';
import { Iitem } from '@type/types';

interface Ifavourites {
    item: number[] 
  }

const initialState: Ifavourites = {
    item: [],
  }


const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addOrDeleteItem(state, action: PayloadAction<number>) {
          if (!(state.item.includes(action.payload))) {
            state.item.push(action.payload)
          }
          else {
            const item = state.item.filter((value, index, array) => value !== action.payload)
            state.item = item
          }
        },
    }
})

export const {addOrDeleteItem} = favouritesSlice.actions
export default favouritesSlice.reducer
export const selectCount = (state: RootState) => state.favourite


