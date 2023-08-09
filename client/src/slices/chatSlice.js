import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage(state, action) {
            const newMessage = action.payload;
            state.messages.push(newMessage);
        },
        getLastFiveMessages(state) {
            const numMessages = state.messages.length;
            if (numMessages <= 5) {
                return state.messages;
            }
            return state.messages.slice(numMessages - 5, numMessages);
        }
    }
});

export const { addMessage, getLastFiveMessages } = chatSlice.actions;

export default chatSlice;