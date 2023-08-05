import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value:{}
}

const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        userCode: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { userCode } = codeSlice.actions;

export default codeSlice;