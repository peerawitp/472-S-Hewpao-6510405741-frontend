interface Message {
    id: number;
    content: string;
    timestamp: string;
}

export default function ChatMessage({ message, self }: { message: Message; self: boolean }) {
    return (
        <div className={`flex flex-col gap-1 ${self ? "items-end" : "items-start"}`}>
            <div className={`p-4 rounded-xl ${self ? "bg-black text-white rounded-tr-none" : "bg-gray-300 text-black rounded-tl-none"}`}>
                <p>{message.content}</p>
            </div>

            <div>
                {/* Chat timestamp */}
                <p className="text-xs text-gray-500">{message.timestamp}</p>
            </div>
        </div>
    );
}