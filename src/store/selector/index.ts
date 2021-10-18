import {RootState} from "../index";

export const getWSConnection = (state: RootState) => state.wsConnectionState
export const getGSetting = (state: RootState) => state.gSetting
export const getGSignalingStatus = (state: RootState) => state.gSignalingState
export const getConnectionStatus = (state: RootState) => state.connectionState
