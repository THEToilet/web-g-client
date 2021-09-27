import {Reducer, combineReducers} from "redux";
import {WebSocketConnectionState} from '../types/domain'
import WSConnectionStatus from './wsConnectionStatus'
import GSetting from './gSetting'
import {GSettingStatus} from '../types/domain'
import GSignalingStatus from './gSignalingStatus'
import {GSignalingState} from '../types/domain'
import ConnectionStatus from './connectionStatus'
import {ConnectionState} from '../types/domain'

export type RootState = {
    wsConnectionState: WebSocketConnectionState
    gSetting: GSettingStatus
    gSignalingState: GSignalingState
    connectionState: ConnectionState
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    wsConnectionState: WSConnectionStatus,
    gSetting: GSetting,
    gSignalingState: GSignalingStatus,
    connectionState: ConnectionStatus
})

export default rootReducer
