import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [
            { author: "bot", message: "Hi, How may I help you today?" },
        ]
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
        },
        deleteLastMessage(state) {
            state.messages.pop();
        },
        clearChat(state) {
            state.messages = [{ author: "bot", message: "Hi, How may I help you today?" },];
        }
    }
});

export const { addMessage, getLastFiveMessages, deleteLastMessage, clearChat } = chatSlice.actions;

export default chatSlice;