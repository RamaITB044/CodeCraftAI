import { configureStore, createSlice } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js'

export const store = configureStore({
    reducer: {
        user: authSlice.reducer,
    }
});