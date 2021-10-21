import {RootState} from "../index";

export const getGSetting = (state: RootState) => state.gSetting
export const getGSignalingStatus = (state: RootState) => state.gSignalingState
export const getConnectionStatus = (state: RootState) => state.wsConnectionState
