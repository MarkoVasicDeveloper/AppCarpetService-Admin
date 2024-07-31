import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SimpleReport = {
    carpets: number,
    tracks: number,
    clients: number,
    price: number,
    surface: number
};

const initialState = {} as SimpleReport;

export const simpleReportSlice = createSlice({
    name: 'simpleReport',
    initialState,
    reducers: {
        setSimpleReport(state, action) {
            state = { ...state, ...action.payload };
            return state;
        }
    }
});

export const { setSimpleReport } = simpleReportSlice.actions;

export default simpleReportSlice.reducer;

export const selectSimpleReport = (state: RootState) => state.simpleReport;