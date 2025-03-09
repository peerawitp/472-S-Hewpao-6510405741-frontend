import ChatMessage from "../component/ChatMessage";
import ChatInput from "../component/ChatInput";
import Form from 'next/form'
import { time } from "console";

const fetchMessages = async () => {
    const res = await fetch("https://67cc4261dd7651e464eb73b2.mockapi.io/api/message");
    
    const data = await res.json();
    return data;
}

export default async function ChatPage() {

    const messages = await fetchMessages();
    
    const currentUserId = 1;
    const currentChatId = 11;

    return (
        <div className="flex flex-col items-center h-screen gap-4 max-h-screen">

            <div className="flex flex-col w-full px-4">
                <h1 className="text-3xl font-bold">Chat</h1>
                <p className="text-gray-500">Chat ID: {currentChatId}</p>
            </div>

            <div className="flex flex-col gap-2 bg-gray-50 p-4 w-full h-full rounded-xl overflow-y-auto">
                {messages.map((msg: any) => (
                    <ChatMessage key={msg.id} message={msg} self={msg.userID === currentUserId} />
                ))}
            </div>
            
            <ChatInput currentChatId={currentChatId} currentUserId={currentUserId}/>

        </div>
    );
}