import {Reducer, combineReducers} from "redux";
import WSConnectionStatus from './wsConnectionStatus'
import GSignalingStatus from './gSignalingStatus'
import GSetting from './gSetting'
import {GSettingStatus} from '../type'
import {GSignalingState} from '../type'
import {WebSocketConnectionState} from '../type'

export type RootState = {
    wsConnectionState: WebSocketConnectionState
    gSetting: GSettingStatus
    gSignalingState: GSignalingState
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    wsConnectionState: WSConnectionStatus,
    gSetting: GSetting,
    gSignalingState: GSignalingStatus,
})

export default rootReducer
