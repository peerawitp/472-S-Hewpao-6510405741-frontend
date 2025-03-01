import ChatMessage from "../component/ChatMessage";

export default function ChatPage() {

    const mockMessages = [
        { id: 1, text: "Hello!", timestamp: "10:00 AM", senderId: 2 },
        { id: 2, text: "Hi! How are you?", timestamp: "10:01 AM", senderId: 1 },
        { id: 3, text: "I'm good, thanks!", timestamp: "10:02 AM", senderId: 2 },
        { id: 4, text: "That's great!", timestamp: "10:03 AM", senderId: 1 },
        { id: 5, text: "What about you?", timestamp: "10:04 AM", senderId: 2 },
    ];
    
    const currentUserId = 1;

    return (
        <div className="flex flex-col items-center h-screen gap-6">
            <div className="flex flex-col gap-2 bg-gray-50 p-4 w-full">
                {mockMessages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} self={msg.senderId === currentUserId} />
                ))}
            </div>

            <div className="w-full flex justify-center items-center gap-4 p-4">

                <div className="w-full rounded-xl shadow-lg px-2 py-4">
                    input right here
                </div>

                <div className="w-12 h-12 bg-pink-400">
                    PHOTO
                </div>

                <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    Send
                </button>

            </div>

        </div>
    );
}