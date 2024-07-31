import { type PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import adminSlice from "./administrator/adminSlice";
import simpleReportSlice from "./report/reportSlice";

const rootReducer = combineReducers({
    admin: adminSlice,
    simpleReport: simpleReportSlice,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState
    })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']