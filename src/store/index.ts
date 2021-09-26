import {configureStore} from '@reduxjs/toolkit'
import {useSelector as rawUseSelector, TypedUseSelectorHook} from "react-redux";
import rootReducer from "../reducers";

export const store = configureStore({
    reducer: rootReducer
})

// https://future-architect.github.io/articles/20200501/

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
