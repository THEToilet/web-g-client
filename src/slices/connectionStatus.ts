import {createSlice} from '@reduxjs/toolkit'
import {ConnectionState} from '../types/domain'

export const initialState: ConnectionState = {
    connectionType : 'NAT'
}

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {

        setConnectionNAT: (state) => {
            state.connectionType = 'NAT'
        },

        setConnectionGLocON: (state) => {
            state.connectionType  = 'G_LOC_ON'
        },

        setConnectionWebRTC: (state) => {
            state.connectionType = 'WEB_RTC'
        },

    },
})

export const {setConnectionNAT, setConnectionGLocON, setConnectionWebRTC} = connectionSlice.actions;

export default connectionSlice.reducer