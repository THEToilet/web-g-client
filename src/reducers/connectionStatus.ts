import {ActionType} from './../types/domain'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type WebSocketConnectionType =
    | 'connected'
    | 'connecting'
    | 'reconnected'
    | 'reconnecting';


export type InitialState = {
    networkOnline: boolean,
    webSocketConnection: WebSocketConnectionType,
}

const initialState: InitialState = {
    networkOnline: true,
    webSocketConnection: "connected",
}

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        tmp: (state, action: PayloadAction<any>) => ({
            ...state,
            networkOnline: false,
        }),
    }
})

export const {tmp} = connectionSlice.actions;

export default connectionSlice.reducer
