import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Message, P2PState} from '../type'

export const initialState: P2PState = {
    destinationUserID: '',
    messageList: []
}

const p2pStatusSlice = createSlice({
    name: 'p2pStatus',
    initialState,
    reducers: {

        setDestinationUserID: (state, {payload}: PayloadAction<string>) => {
            state.destinationUserID = payload
        },

        setMessageList: (state, {payload}: PayloadAction<Message[]>) => {
            state.messageList = payload
        },

    },
})
export const {
    setDestinationUserID,
    setMessageList
} = p2pStatusSlice.actions;

export default p2pStatusSlice.reducer