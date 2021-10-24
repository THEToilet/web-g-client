import {Reducer, combineReducers} from "redux";
import WSConnectionStatus from './wsConnectionStatus'
import GSignalingStatus from './gSignalingStatus'
import GSetting from './gSetting'
import P2PStatus from './p2pStatus'
import {GSettingStatus, P2PState} from '../type'
import {GSignalingState} from '../type'
import {WebSocketConnectionState} from '../type'

export type RootState = {
    wsConnectionState: WebSocketConnectionState
    gSetting: GSettingStatus
    gSignalingState: GSignalingState
    p2pState: P2PState
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    wsConnectionState: WSConnectionStatus,
    gSetting: GSetting,
    gSignalingState: GSignalingStatus,
    p2pState: P2PStatus,
})

export default rootReducer
