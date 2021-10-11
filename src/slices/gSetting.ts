import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GSettingStatus} from '../types/domain'

export const initialState: GSettingStatus = {
    searchDistance : 100,
    searchType : "STATIC",
}

const gSettingSlice = createSlice({
    name: 'gSetting',
    initialState,
    reducers: {

        setSearchDistance: (state, {payload}: PayloadAction<number>) => {
            state.searchDistance = payload
        },

        setStaticSearch: (state) => {
            state.searchType = 'STATIC'
        },

        setDynamicSearch: (state) => {
            state.searchType = 'DYNAMIC'
        },
    },
})

export const {setSearchDistance, setDynamicSearch, setStaticSearch} = gSettingSlice.actions;

export default gSettingSlice.reducer