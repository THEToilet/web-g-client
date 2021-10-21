import {Reducer, combineReducers} from "redux";
import {WebSocketConnectionState} from '../type'
import WSConnectionStatus from './wsConnectionStatus'
import GSetting from './gSetting'
import {GSettingStatus} from '../type'
import GSignalingStatus from './gSignalingStatus'
import {GSignalingState} from '../type'
import {ConnectionState} from '../type'

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
