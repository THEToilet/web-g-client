import {configureStore} from '@reduxjs/toolkit'
import {useSelector as rawUseSelector, TypedUseSelectorHook} from "react-redux";
import rootReducer from "./slices";

export const store = configureStore({
    reducer: rootReducer,
    // chrome extensions
    devTools: process.env.NODE_ENV !== 'production',
})

// https://future-architect.github.io/articles/20200501/

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
