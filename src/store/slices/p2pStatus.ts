import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {P2PState} from '../type'

export const initialState: P2PState = {
    destinationUserID: ''
}

const p2pStatusSlice = createSlice({
    name: 'p2pStatus',
    initialState,
    reducers: {

        setDestinationUserID: (state, {payload}: PayloadAction<string>) => {
            state.destinationUserID = payload
        },
    },
})
export const {
    setDestinationUserID
} = p2pStatusSlice.actions;

export default p2pStatusSlice.reducer