import React from 'react'
import './Chat.scss'
import { Container, Textarea } from '@mantine/core';
import send_logo from '../../assets/icons/send.svg'
import { addMessage, getLastFiveMessages } from '../../slices/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

const Chat = () => {
    const dispatch = useDispatch();
    const code = useSelector(state => state.code.value);
    const messages = useSelector(state => state.chat.messages);

    const handleSendMessage = () => {
        let lastFiveMessages;
        const l = messages.length;
        if (l <= 5) {
            lastFiveMessages = messages;
        } else {
            lastFiveMessages = messages.slice(l - 5, l);
        }

        
    }


    return (
        <Container className='Chat-con'>
            <Container className="chatbox">

            </Container>
            <Container className='chat-inp'>
                <Textarea
                    placeholder="Ask your query"
                    autosize
                    minRows={1}

                />
                <div className='control-btn' onClick={handleSendMessage}>
                    <img src={send_logo} alt="run" />
                </div>
            </Container>

        </Container>
    )
}

export default Chat