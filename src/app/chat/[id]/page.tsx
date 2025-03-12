'use client';
import { useParams } from "next/navigation"; 
import ChatMessage from "../../component/ChatMessage";
import ChatInput from "../../component/ChatInput";
import Form from 'next/form'
import { time } from "console";

const fetchMessages = async (chatId: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/api/message${chatId}`);
    
    console.log(`${process.env.NEXT_PUBLIC_API_BASEURL}/api/message${chatId}`);
    console.log(res);
    
    const data = await res.json();
    return data;
}

export default async function ChatPage() {
    const router = useParams();
    const { id } = router;

    const currentUserId = '1';
    const currentChatId = id;
    
    console.log('currentChatId', currentChatId);
    console.log('api url', `${process.env.NEXT_PUBLIC_API_BASEURL}/api/message/${currentChatId}`);

    // const messages = await fetchMessages(currentChatId);

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