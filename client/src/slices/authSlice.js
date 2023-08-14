import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {},
    globalLoading: true,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        metaData: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initialState;
        },
        setGlobalLoading: (state, action) => {
            state.globalLoading = action.payload;
        }
    },
});

export const { metaData, logout, setGlobalLoading } = authSlice.actions;

export default authSlice;