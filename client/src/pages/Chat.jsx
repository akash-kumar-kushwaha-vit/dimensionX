import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { Send, User } from 'lucide-react';
import { API_BASE_URL } from '../config';

const Chat = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const scrollRef = useRef();

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null); // The user object we are talking to
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Check if we navigated here with a specific user to chat with
    useEffect(() => {
        if (location.state?.startChatWith) {
            setCurrentChat(location.state.startChatWith);
        }
    }, [location.state]);

    // Fetch list of conversations
    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/messages/conversations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setConversations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch messages for current chat
    const fetchMessages = async () => {
        if (!currentChat) return;
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`/api/messages/${currentChat._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Send message
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentChat) return;

        const payload = {
            recipientId: currentChat._id,
            content: newMessage
        };

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/messages', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages([...messages, res.data]);
            setNewMessage('');
            fetchConversations(); // Update side list for last message
        } catch (err) {
            console.error(err);
        }
    };

    // Polling for new messages (simple implementation)
    useEffect(() => {
        fetchConversations();
        const interval = setInterval(() => {
            fetchConversations();
            if (currentChat) fetchMessages();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentChat]);

    // Scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Container className="py-4 h-100" style={{ height: 'calc(100vh - 80px)' }}>
            <div className="glass-card shadow-lg overflow-hidden h-100 d-flex" style={{ borderRadius: '24px', height: '80vh' }}>

                {/* Sidebar: Conversation List */}
                <div className="w-30 border-end bg-white d-none d-md-flex flex-column" style={{ width: '350px' }}>
                    <div className="p-3 border-bottom bg-light">
                        <h5 className="mb-0 fw-bold">Messages</h5>
                    </div>
                    <div className="flex-grow-1 overflow-auto">
                        <ListGroup variant="flush">
                            {conversations.map((conv, idx) => (
                                <ListGroup.Item
                                    key={idx}
                                    action
                                    active={currentChat?._id === conv.partner._id}
                                    onClick={() => setCurrentChat(conv.partner)}
                                    className="border-0 py-3 px-3"
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div
                                            className="rounded-circle border d-flex align-items-center justify-content-center bg-light text-primary fw-bold"
                                            style={{ width: '45px', height: '45px', minWidth: '45px' }}
                                        >
                                            {conv.partner.picture ? (
                                                <img
                                                    src={`http://localhost:5000/${conv.partner.picture}`}
                                                    className="rounded-circle w-100 h-100 object-fit-cover"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                            ) : (
                                                conv.partner.name?.charAt(0).toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="fw-semibold text-truncate">{conv.partner.name}</span>
                                                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                                    {new Date(conv.date).toLocaleDateString()}
                                                </small>
                                            </div>
                                            <p className="mb-0 text-muted small text-truncate">
                                                {conv.partner._id === user._id ? 'You: ' : ''}{conv.lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                            {conversations.length === 0 && (
                                <div className="text-center p-4 text-muted">
                                    <small>No conversations yet.</small>
                                </div>
                            )}
                        </ListGroup>
                    </div>
                </div>

                {/* Chat Window */}
                <div className="flex-grow-1 d-flex flex-column bg-white">
                    {currentChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-3 border-bottom d-flex align-items-center gap-3 bg-white">
                                <div
                                    className="rounded-circle border d-flex align-items-center justify-content-center bg-light text-primary fw-bold"
                                    style={{ width: '40px', height: '40px' }}
                                >
                                    {currentChat.picture ? (
                                        <img
                                            src={`http://localhost:5000/${currentChat.picture}`}
                                            className="rounded-circle w-100 h-100 object-fit-cover"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    ) : (
                                        currentChat.name?.charAt(0).toUpperCase() || 'U'
                                    )}
                                </div>
                                <h6 className="mb-0 fw-bold">{currentChat.name}</h6>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-grow-1 p-4 overflow-auto bg-light">
                                <div className="d-flex flex-column gap-3">
                                    {messages.map((msg, index) => {
                                        const isOwn = msg.sender === user._id;
                                        return (
                                            <div
                                                key={index}
                                                className={`d-flex ${isOwn ? 'justify-content-end' : 'justify-content-start'}`}
                                            >
                                                <div
                                                    className={`px-3 py-2 rounded-4 shadow-sm ${isOwn ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                                                    style={{ maxWidth: '75%', borderBottomRightRadius: isOwn ? '4px' : '16px', borderBottomLeftRadius: isOwn ? '16px' : '4px' }}
                                                >
                                                    <div>{msg.content}</div>
                                                    <div className={`text-end mt-1 ${isOwn ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.65rem' }}>
                                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={scrollRef} />
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-3 border-top bg-white">
                                <Form onSubmit={handleSubmit} className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="rounded-pill border bg-light px-4"
                                    />
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <Send size={18} />
                                    </Button>
                                </Form>
                            </div>
                        </>
                    ) : (
                        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted bg-light">
                            <div className="p-4 rounded-circle bg-white shadow-sm mb-3">
                                <User size={48} className="text-primary opacity-50" />
                            </div>
                            <h5>Select a conversation</h5>
                            <p>Choose a chat from the left or start a new message from an item.</p>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Chat;
