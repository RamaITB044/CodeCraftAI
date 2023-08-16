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
            const {creditsLeft, operation} = action.payload;
            console.log(creditsLeft);
            state.value.credits.value = creditsLeft;
            if (operation === "optimize") {
                state.value.total_code_optimizations += 1;
            } else if (operation === "debug") {
                state.value.total_code_debuggings += 1;
            } else if (operation === "summarize") {
                state.value.total_code_summarizations += 1;
            }else {
                state.value.total_code_generations += 1;
            }
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
                state.value.codes[codeIndex].last_edited = new Date().toISOString();
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
