import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
    ArrowUp,
    Bot,
    Loader2,
    Sparkles,
    User,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
    createMessage,
    type ChatMessage,
} from "../api/message.api";

import { getConversation } from "../api/conversation.api";

const Chat = () => {
    const { conversationId } = useParams<{
        conversationId: string;
    }>();

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");

    const [loadingMessages, setLoadingMessages] = useState(true);
    const [sending, setSending] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    /*
     * Load existing conversation when the page opens
     * or when conversationId changes.
     */
    useEffect(() => {
        const loadConversation = async () => {
            if (!conversationId) {
                toast.error("Conversation not found.");
                setLoadingMessages(false);
                return;
            }

            try {
                setLoadingMessages(true);

                const response = await getConversation(
                    conversationId
                );

                const conversation =
                    response.data.conversation;

                setMessages(conversation.messages || []);
            } catch (error: any) {
                console.error(
                    "Failed to load conversation:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                        "Failed to load conversation."
                );
            } finally {
                setLoadingMessages(false);
            }
        };

        loadConversation();
    }, [conversationId]);

    /*
     * Automatically scroll to the latest message.
     */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, sending]);

    /*
     * Send message to backend.
     */
    const handleSend = async () => {
        const content = input.trim();

        if (!content) {
            return;
        }

        if (!conversationId) {
            toast.error("Conversation not found.");
            return;
        }

        if (sending) {
            return;
        }

        /*
         * Show user message immediately.
         */
        const temporaryUserMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "USER",
            content,
            createdAt: new Date().toISOString(),
        };

        setMessages((previous) => [
            ...previous,
            temporaryUserMessage,
        ]);

        setInput("");
        setSending(true);

        try {
            const response = await createMessage(
                conversationId,
                content
            );

            if (!response.success) {
                throw new Error(
                    "Failed to generate response."
                );
            }

            /*
             * Add assistant response.
             */
            setMessages((previous) => [
                ...previous,
                response.data.message,
            ]);
        } catch (error: any) {
            console.error(
                "Failed to send message:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to generate response."
            );

            /*
             * Remove the temporary user message
             * if the request fails.
             */
            setMessages((previous) =>
                previous.filter(
                    (message) =>
                        message.id !==
                        temporaryUserMessage.id
                )
            );
        } finally {
            setSending(false);
        }
    };

    /*
     * Enter = send
     * Shift + Enter = new line
     */
    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();
            handleSend();
        }
    };

    /*
     * Loading state while fetching conversation.
     */
    if (loadingMessages) {
        return (
            <main className="flex min-h-screen flex-col bg-[#07070a] text-white">
                {/* Navbar */}
                <header className="border-b border-white/10 bg-[#07070a]/90 backdrop-blur-xl">
                    <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20">
                                <Sparkles className="h-4 w-4" />
                            </div>

                            <span className="text-lg font-semibold tracking-tight">
                                ExplainThisAI
                            </span>
                        </div>

                        <div className="text-xs text-gray-500">
                            AI Document Assistant
                        </div>
                    </div>
                </header>

                {/* Loading */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
                        Loading conversation...
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col bg-[#07070a] text-white">
            {/* Navbar */}
            <header className="border-b border-white/10 bg-[#07070a]/90 backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20">
                            <Sparkles className="h-4 w-4" />
                        </div>

                        <span className="text-lg font-semibold tracking-tight">
                            ExplainThisAI
                        </span>
                    </div>

                    <div className="text-xs text-gray-500">
                        AI Document Assistant
                    </div>
                </div>
            </header>

            {/* Chat area */}
            <section className="flex flex-1 flex-col">
                <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 sm:px-8">
                    {/* Messages */}
                    <div className="flex-1 space-y-6 overflow-y-auto py-8">
                        {messages.length === 0 && (
                            <div className="flex min-h-[60vh] items-center justify-center">
                                <div className="max-w-lg text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                                        <Bot className="h-8 w-8" />
                                    </div>

                                    <h1 className="mt-6 text-2xl font-semibold">
                                        Ask anything about your documents
                                    </h1>

                                    <p className="mt-3 text-sm leading-6 text-gray-500">
                                        Your question will be answered
                                        using the documents attached to
                                        this conversation.
                                    </p>
                                </div>
                            </div>
                        )}

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${
                                    message.role === "USER"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                {/* Assistant avatar */}
                                {message.role === "ASSISTANT" && (
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                )}

                                {/* Message */}
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                                        message.role === "USER"
                                            ? "bg-violet-600 text-white"
                                            : "border border-white/10 bg-white/[0.04] text-gray-200"
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap">
                                        {message.content}
                                    </p>
                                </div>

                                {/* User avatar */}
                                {message.role === "USER" && (
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gray-300">
                                        <User className="h-4 w-4" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* AI thinking */}
                        {sending && (
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                                    <Bot className="h-4 w-4" />
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Thinking...
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="sticky bottom-0 pb-5 pt-3">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/20">
                            <textarea
                                value={input}
                                onChange={(event) =>
                                    setInput(event.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                disabled={sending}
                                placeholder="Ask a question about your documents..."
                                rows={2}
                                className="w-full resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 disabled:opacity-50"
                            />

                            <div className="flex items-center justify-between px-2 pb-1">
                                <span className="text-xs text-gray-600">
                                    Enter to send · Shift + Enter for
                                    new line
                                </span>

                                <button
                                    onClick={handleSend}
                                    disabled={
                                        sending ||
                                        !input.trim()
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-950 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {sending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <ArrowUp className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Chat;