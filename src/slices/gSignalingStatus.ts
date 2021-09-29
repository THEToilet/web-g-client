import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Addr, GSignalingState} from '../types/domain'
import {GeoLocation} from '../types/domain'
import {BackEndUserInfo} from "../types/API";

export const initialState: GSignalingState = {
    userInfo: {
        public: {
            ip: '',
            port: 0,
        },
        private: {
            ip: '',
            port: 0,
        },
        geoLocation: {
            lat: 0,
            lng: 0,
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

        setUserInfoPrivateAddr: (state, {payload}: PayloadAction<Addr>) => {
            state.userInfo.private = payload
        },

        setUserInfoPublicAddr: (state, {payload}: PayloadAction<Addr>) => {
            state.userInfo.public = payload
        },

        setSurroundingUserList: (state, {payload}: PayloadAction<BackEndUserInfo[]>) => {
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
    setUserInfoPrivateAddr,
    setUserInfoPublicAddr,
    setSurroundingUserList,
    setIsRegister,
    setUserID
} = gSignalingStatusSlice.actions;

export default gSignalingStatusSlice.reducer