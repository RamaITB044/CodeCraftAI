import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value:{}
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
    },
});

export const { metaData, logout } = authSlice.actions;

export default authSlice;