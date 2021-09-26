import connectionReducer, {InitialState} from './connectionStatus';
import {Reducer, combineReducers} from "redux";

export type RootState = {
    connectionState:InitialState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    connectionState: connectionReducer
})

export default rootReducer
