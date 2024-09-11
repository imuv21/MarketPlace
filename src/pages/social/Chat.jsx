import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../../slices/friendsSlice';
import { io } from 'socket.io-client';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useParams } from 'react-router-dom';
const MAIN_URL = import.meta.env.VITE_MAIN_URL;


const Chat = () => {

    const chatBodyRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const { chat, receiver, msgLoading } = useSelector((state) => state.friends);
    const { user } = useSelector((state) => state.auth);
    const senderId = user._id;
    const { receiverId } = useParams();
    const defImg = 'https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg';
    const [messageContent, setMessageContent] = useState('');
    const [sending, setSending] = useState(false);
    const [messages, setMessages] = useState(chat);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const sendText = async (e) => {
        e.preventDefault();
        if (sending) return;
        setSending(true);
        const tempMsg = {
            sender: { _id: senderId },
            receiver: { _id: receiverId },
            content: messageContent,
            timestamp: new Date().toISOString(),
        };
        try {
            // setMessages([...messages, tempMsg]);
            socket.emit('newMessage', tempMsg);

            const result = await dispatch(sendMessage({ senderId, receiverId, content: messageContent })).unwrap();

            if (result.status !== 'success') {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
            // setMessages(messages.filter(msg => msg !== tempMsg));
        } finally {
            setMessageContent('');
            setSending(false);
        }
    };

    useEffect(() => {
        const newSocket = io(MAIN_URL);
        setSocket(newSocket);
        newSocket.emit('joinRoom', { senderId, receiverId });

        return () => {
            newSocket.disconnect();
        };
    }, [senderId, receiverId]);

    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (message) => {
                console.log('New message received:', message);
                setMessages((prevMessages) => {
                    if (!prevMessages.some((msg) => msg.timestamp === message.timestamp)) {
                        return [...prevMessages, message];
                    }
                    return prevMessages;
                });
            });
        }
    }, [socket, senderId, receiverId]);

    useEffect(() => {
        dispatch(fetchMessages({ senderId, receiverId }));
    }, [dispatch, senderId, receiverId]);

    useEffect(() => {
        setMessages(chat);
    }, [chat]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    if (msgLoading) return <div>Loading...</div>;




    return (
        <Fragment>

            <Helmet>
                <title>Chat | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
                <link rel="canonical" href="https://imuv21.netlify.app/chat/:receiverId" />
            </Helmet>

            <div className='page flexcol center'>
                <div className="chat-component">

                    {receiver && <div className="reciever">
                        <img src={receiver.image ? receiver.image : defImg} alt={`${receiver.firstName}_${receiver.lastName}`} />
                        <div className="flex center g5">
                            <p className="headingSmol">{`${receiver.firstName}  ${receiver.lastName}`}</p>
                            {receiver.isVerified === 1 ? <VerifiedIcon style={{ color: 'var(--footer)' }} /> : <NewReleasesIcon style={{ color: 'orange' }} />}
                        </div>
                    </div>}

                    <div className="chatBody" ref={chatBodyRef}>
                        {messages && messages.map((message, index) => (
                            <Fragment key={index}>
                                {message.sender._id === senderId ? (
                                    <div className="senderChat">
                                        <div className="senderMsg">
                                            <p className="text">{message.content}</p>
                                            <div className="timestamp">{formatTimestamp(message.timestamp)}</div>
                                        </div>
                                    </div>
                                ) : message.sender._id === receiverId ? (
                                    <div className="recieverChat">
                                        <div className="recieverMsg">
                                            <p className="text">{message.content}</p>
                                            <div className="timestamp">{formatTimestamp(message.timestamp)}</div>
                                        </div>
                                    </div>
                                ) : null}
                            </Fragment>
                        ))}
                    </div>

                    <form className="sendInput" onSubmit={sendText}>
                        <input type="text" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} placeholder="Type your message..." required />
                        <button type='submit' disabled={sending}>{sending ? 'Sending...' : 'Send'}</button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
};

export default Chat;