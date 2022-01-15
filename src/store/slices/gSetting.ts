import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GSettingStatus} from '../type'

export const initialState: GSettingStatus = {
    searchDistance: 100,
    searchType: "STATIC",
    dataChannelType: 'TCP'
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

        setUDPMode: (state) => {
            state.dataChannelType = 'UDP'
        },

        setTCPMode: (state) => {
            state.dataChannelType = 'TCP'
        },
    },
})

export const {setSearchDistance, setDynamicSearch, setStaticSearch, setTCPMode, setUDPMode} = gSettingSlice.actions;

export default gSettingSlice.reducer