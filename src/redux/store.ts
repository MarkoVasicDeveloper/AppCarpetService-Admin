import { type PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import adminSlice from "./administrator/adminSlice";

const rootReducer = combineReducers({
    admin: adminSlice
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState
    })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']