import { configureStore, createSlice } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js'
import codeSlice from './slices/codeSlice.js';
import userSlice from './slices/userSlice.js';
import chatSlice from './slices/chatSlice.js';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        code: codeSlice.reducer,
        user: userSlice.reducer,
        chat: chatSlice.reducer
    }
});