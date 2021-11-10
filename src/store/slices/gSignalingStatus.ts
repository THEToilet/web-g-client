import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GSignalingState} from '../type'
import {GeoLocation, UserInfo} from '../../types/domain'

export const initialState: GSignalingState = {
    userInfo: {
        userID : '',
        geoLocation: {
            latitude: 0,
            longitude: 0,
        },
    },
    surroundingUserList: [],
    isRegister: false,
    userID: "",
}

const gSignalingStatusSlice = createSlice({
    name: 'gSignalingStatus',
    initialState,
    reducers: {

        setUserInfoGeoLocation: (state, {payload}: PayloadAction<GeoLocation>) => {
            state.userInfo.geoLocation = payload
        },

        setSurroundingUserList: (state, {payload}: PayloadAction<UserInfo[]>) => {
            state.surroundingUserList = payload
        },

        setIsRegister: (state) => {
            state.isRegister = !state.isRegister
        },

        setUserID: (state, {payload}: PayloadAction<string>) => {
            state.userID = payload
        },
    },
})
export const {
    setUserInfoGeoLocation,
    setSurroundingUserList,
    setIsRegister,
    setUserID
} = gSignalingStatusSlice.actions;

export default gSignalingStatusSlice.reducer