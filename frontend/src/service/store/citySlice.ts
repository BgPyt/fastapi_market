import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from './init';
import { Iitem } from '@type/types';
import { EnumCity } from '@type/enum';

interface Icity {
    city: EnumCity
    value: string 
}

const initialState: Icity = {
    city: EnumCity.kem,
    value: "kem"
  }


const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        selectCity(state, action: PayloadAction<Icity>) {
          state.city = EnumCity[action.payload.value as keyof typeof EnumCity]
          state.value = action.payload.value
        },
    }
})

export const {selectCity} = citySlice.actions
export default citySlice.reducer
export const selectCount = (state: RootState) => state.city
