import {createSlice} from '@reduxjs/toolkit'
import {WebSocketConnectionState} from '../type'

export const initialState: WebSocketConnectionState = {
    wsConnectionType : 'CONNECTING'
}

const wsConnectionSlice = createSlice({
    name: 'wsConnection',
    initialState,
    reducers: {

        connecting: (state) => {
            state.wsConnectionType = 'CONNECTING'
        },

        connected: (state) => {
            state.wsConnectionType = 'CONNECTED'
        },

        reconnecting: (state) => {
            state.wsConnectionType = 'RECONNECTING'
        },

        reconnected: (state) => {
            state.wsConnectionType = 'RECONNECTED'
        },
    },
})

export const {connecting, connected, reconnecting, reconnected} = wsConnectionSlice.actions;

export default wsConnectionSlice.reducer
