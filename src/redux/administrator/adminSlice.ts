import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Admin = {
    id: number,
    identity: string,
    token: string,
    refreshToken: string,
    tokenExpire: string
};

const initialState = {} as Admin;

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin(state, action) {
            state = { ...state, ...action.payload };
            return state;
        }
    }
});

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;

export const selectAdminToken = (state: RootState) => state.admin.token;