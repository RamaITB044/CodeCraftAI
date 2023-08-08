import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value:{}
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
        updateCredits: (state, action) => {
            state.value.credits = action.payload;
        },
        addCode: (state, action) => {
            state.value.codes.push(action.payload);
        },
        updateCode: (state, action) => {
            const { code_id, code, language, file_name } = action.payload;
            const codeIndex = state.value.codes.findIndex(code => code.code_id === code_id);
            if (codeIndex !== -1) {
                state.value.codes[codeIndex].code = code;
                state.value.codes[codeIndex].language = language;
                state.value.codes[codeIndex].file_name = file_name;
                state.value.codes[codeIndex].last_edited = new Date();
            }
        },
        deleteCode: (state, action) => {
            const codeIndex = state.value.codes.findIndex(code => code.code_id === action.payload);
            if (codeIndex !== -1) {
                state.value.codes.splice(codeIndex, 1);
            }
        },
        setPlan: (state, action) => {
            state.value.plan = action.payload;
        },
        updatePlan: (state, action) => {
            state.value.plan = { ...state.value.plan, ...action.payload };
        },
    },
});

export const { setUser, updateCredits, addCode, updateCode, deleteCode, setPlan, updatePlan } = userSlice.actions;

export default userSlice;
