'use client';

import { useState } from 'react';
import './ChatBox.css'
import Loading from '@/app/loading';

export default function Chat() {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; time: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add user message to chat
        setMessages((prev) => [
            ...prev,
            { role: 'user', text: input, time: currentTime },
        ]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/AI', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input }),
            });

            console.log('Response status:', res.status);
            const data = await res.json();
            if (data.generatedContent) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', text: data.generatedContent ?? 'Sorry, something went wrong.', time: currentTime },
                ]);
            }
        } catch (err) {
            console.error('Error:', err); // In ra lỗi
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', text: 'Something went wrong. Please try again.', time: currentTime },
            ]);

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="position-relative d-flex w-85 mr-auto w-100 flex-column">
            <div className="chat-messages p-4" style={{ height: '400px', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message-${message.role === 'user' ? 'right' : 'left'} pb-4`}
                    >
                        <div>
                            <img
                                src={
                                    message.role === 'user'
                                        ? 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
                                        : 'https://www.shutterstock.com/image-vector/robot-icon-chatbot-cute-smiling-600nw-715418284.jpg'
                                }
                                className="rounded-circle mr-1"
                                alt={message.role === 'user' ? 'You' : 'Assistant'}
                                width="40"
                                height="40"
                            />
                            <div className="text-muted small text-nowrap mt-2">{message.time}</div>
                        </div>
                        <div
                            className={`flex-shrink-1 bg-light rounded py-2 px-3 ${message.role === 'user' ? 'mr-3' : 'ml-3'
                                }`}
                        >
                            <div className="font-weight-bold mb-1">
                                {message.role === 'user' ? 'You' : 'Assistant'}
                            </div>
                            {message.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="chat-message-left pb-4">
                        <div>
                            <img
                                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                className="rounded-circle mr-1"
                                alt="Assistant"
                                width="40"
                                height="40"
                            />
                            <div className="text-muted small text-nowrap mt-2">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                            <div className="font-weight-bold mb-1">Assistant</div>
                            Typing...
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-grow-0 py-3 px-4 border-top">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleSendMessage}
                        disabled={loading || !input.trim()}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
