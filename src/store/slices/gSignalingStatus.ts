import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GSignalingState} from '../type'
import {GeoLocation, UserInfo} from '../../types/domain'

export const initialState: GSignalingState = {
    userInfo: {
        userID: '',
        geoLocation: {
            latitude: 0,
            longitude: 0,
        },
    },
    userName: '',
    surroundingUserList: [],
    isRegister: false,
    userID: '',
    isConnected: false,
    connectedUser: '',
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
            state.userInfo.userID = payload
            state.userID = payload
        },

        setUserName: (state, {payload}: PayloadAction<string>) => {
            state.userName = payload
        },

        setConnected: (state, {payload}: PayloadAction<boolean>) => {
            state.isConnected = payload
        },

        setConnectedUser: (state, {payload}: PayloadAction<string>) => {
            state.connectedUser = payload
        },
    },
})
export const {
    setUserInfoGeoLocation,
    setSurroundingUserList,
    setIsRegister,
    setUserID,
    setUserName,
    setConnected,
    setConnectedUser,
} = gSignalingStatusSlice.actions;

export default gSignalingStatusSlice.reducer