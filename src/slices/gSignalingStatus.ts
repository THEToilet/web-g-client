import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Addr, GSignalingState} from '../types/domain'
import {UserInfo, GeoLocation} from '../types/domain'

export const initialState: GSignalingState = {
    userInfo: {
        public : {
            ip : '',
            port : 0,
        },
        private : {
            ip : '',
            port : 0,
        },
        geoLocation: {
            lat : 0,
            lng : 0,
        },
    },
    surroundingUserList: [],
    isRegister: false,
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

        setSurroundingUserList: (state, {payload}: PayloadAction<UserInfo[]>) => {
            state.surroundingUserList = payload
        },

        setIsRegister: (state) => {
            state.isRegister = !state.isRegister
        },
    },
})
export const { setUserInfoGeoLocation, setUserInfoPrivateAddr, setUserInfoPublicAddr, setSurroundingUserList, setIsRegister } = gSignalingStatusSlice.actions;

export default gSignalingStatusSlice.reducer