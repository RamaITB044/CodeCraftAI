import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: '',
    previousValues: [],
    language: 'javascript'
};

const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        userCode: (state, action) => {
            state.previousValues.push(state.value); // save the current value to the previousValues array
            state.value = action.payload;
        },
        undoCode: (state) => {
            if (state.previousValues.length > 0) {
                state.value = state.previousValues.pop(); // restore the previous value and remove it from the previousValues array
            }
        },
        editorLanguage: (state, action) => {
            state.language = action.payload;
        }
    },
});

export const { userCode, undoCode, editorLanguage } = codeSlice.actions;

export default codeSlice;