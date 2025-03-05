import ChatMessage from "../component/ChatMessage";
import ChatInput from "../component/ChatInput";
import Form from 'next/form'
import { time } from "console";

export default function ChatPage() {

    const mockMessages = [
        { id: 1, text: "Hello!", timestamp: "10:00 AM", senderId: 2 },
        { id: 2, text: "Hi! How are you?", timestamp: "10:01 AM", senderId: 1 },
        { id: 3, text: "I'm good, thanks!", timestamp: "10:02 AM", senderId: 2 },
        { id: 4, text: "That's great!", timestamp: "10:03 AM", senderId: 1 },
        { id: 5, text: "What about you?", timestamp: "10:04 AM", senderId: 2 },
    ];
    
    const currentUserId = 1;
    const currentChatId = 11;

    return (
        <div className="flex flex-col items-center h-screen gap-6">

            <div>
                <h1 className="text-3xl font-bold">Chat</h1>
            </div>

            <div className="flex flex-col gap-2 bg-gray-50 p-4 w-full rounded-xl">
                {mockMessages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} self={msg.senderId === currentUserId} />
                ))}
            </div>
            
            <ChatInput currentChatId={currentChatId} currentUserId={currentUserId}/>

        </div>
    );
}