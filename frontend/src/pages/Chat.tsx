import { useParams } from "react-router-dom";

const Chat = () => {
    const { conversationId } = useParams();

    return (
        <main className="min-h-screen bg-[#07070a] text-white">
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold">
                        Chat
                    </h1>

                    <p className="mt-3 text-gray-400">
                        Conversation ID
                    </p>

                    <p className="mt-2 rounded-lg bg-white/5 px-4 py-2 font-mono text-sm text-violet-400">
                        {conversationId}
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Chat;