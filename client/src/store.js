import { configureStore, createSlice } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js'
import codeSlice from './slices/codeSlice.js';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        code: codeSlice.reducer
    }
});