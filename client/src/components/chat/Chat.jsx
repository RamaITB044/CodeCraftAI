import React, { useState, useRef } from 'react'
import './Chat.scss'
import { Container, Textarea } from '@mantine/core';
import send_logo from '../../assets/icons/send.svg'
import broom_logo from '../../assets/icons/broom.svg'
import rolling_spinner from '../../assets/icons/rolling.svg'
import { addMessage, deleteLastMessage, clearChat } from '../../slices/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Chat = () => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const code = useSelector(state => state.code.value);
    const messages = useSelector(state => state.chat.messages);
    const [userMessage, setUserMessage] = useState("");
    const [lastFiveMessages, setLastFiveMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // useState(() => {
    //     console.log(messages);
    // }, [])

    const handleSendMessage = async () => {
        if (userMessage === "") {
            return;
        }

        let lastMessage = { author: "user", message: userMessage };
        dispatch(addMessage(lastMessage));
        
        let lastFiveMessages = new Array();
        const l = messages.length;
        if (l <= 5) {
            lastFiveMessages = messages;
        } else {
            lastFiveMessages = messages.slice(l - 5, l);
        }

        if (ref.current) {
            ref.current.value = "";
        }

        // setLastFiveMessages(...lastFiveMessages, lastMessage);
        console.log([...lastFiveMessages, lastMessage]);

        try {
            setUserMessage("");
            setLoading(true)
            const resp = await Axios.post(APP_SERVER + '/api/ai/chat', { code: code.replace(/\s/g, ""), messages: [...lastFiveMessages, lastMessage] }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            dispatch(addMessage({ author: "bot", message: await resp.data.reply }));
            setLoading(false);
            // dispatch(updateCredits({creditsLeft, operation}));
            // dispatch(userCode(resp.data.text.slice(2)));
        } catch (error) {
            dispatch(deleteLastMessage());
            setLoading(false);
            toast.error("Something went wrong!")
            console.log(error);
        }
    }

    function handleClearChat() {
        dispatch(clearChat());
    }

    return (
        <Container className='Chat-con'>
            <Container className="chat-box">
                {messages.length > 0 ? messages.map((val, idx) => {
                    if (val.author === "bot") {
                        return <div className='bot' key={idx}>
                            <p>{val.message}</p>
                        </div>
                    } else {
                        return <div className='user' key={idx}>
                            <p>{val.message}</p>
                        </div>
                    }
                }) : <p>No messages</p>}
            </Container>
            <Container className='chat-inp'>
                <div className='send-btn small-box' onClick={handleClearChat}>
                    <img src={broom_logo} alt="Clear chat" />
                </div>
                <Textarea
                    maxRows={4}
                    placeholder="Ask your query"
                    autosize
                    minRows={1}
                    onChange={(event) => setUserMessage(event.currentTarget.value)}
                    ref={ref}
                />
                {loading ?
                    <div className='send-btn small-box'>
                        <img src={rolling_spinner} alt="Spinner" />
                    </div> :
                    <div className='send-btn' onClick={handleSendMessage}>
                        <img src={send_logo} alt="run" />
                    </div>
                }
            </Container>

        </Container>
    )
}

export default Chat