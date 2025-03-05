'use client';

import { useState } from "react";

export default function ChatInput({ currentChatId, currentUserId }: { currentChatId: number, currentUserId: number }) {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message.trim() !== '') {
            const req = {
                uid: currentUserId,
                message: message,
                cid: currentChatId,
                timestamp: new Date().toLocaleTimeString(),
            };

            console.log(req);
            
        }

        setMessage('');
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="w-full flex justify-center items-center gap-4 p-4">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl shadow-lg px-2 py-4"
                placeholder="พิมพ์ข้อความตรงนี้..."
            />

            <div className="cursor-pointer">
                <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                </svg>
            </div>

            <button 
                onClick={sendMessage}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                Send
            </button>
        </div>
    )
}