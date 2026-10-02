import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowUp,
    FileText,
    Loader2,
    Paperclip,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
    createMessage,
    type ChatMessage,
} from "../api/message.api";

import {
    getConversation,
    type Conversation,
} from "../api/conversation.api";

import { cleanAIResponse } from "../utils/text.util";

const Chat = () => {
    const { conversationId } = useParams<{
        conversationId: string;
    }>();

    const [conversation, setConversation] =
        useState<Conversation | null>(null);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");

    const [loadingMessages, setLoadingMessages] =
        useState(true);

    const [sending, setSending] = useState(false);

    const textareaRef =
        useRef<HTMLTextAreaElement>(null);

    const messagesEndRef =
        useRef<HTMLDivElement>(null);

    /*
     * Load conversation whenever the
     * conversation ID changes.
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

                const response =
                    await getConversation(conversationId);

                const currentConversation =
                    response.data.conversation;

                setConversation(currentConversation);
                setMessages(
                    currentConversation.messages || []
                );
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
     * Scroll to latest message.
     */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, sending]);

    /*
     * Automatically grow textarea.
     */
    useEffect(() => {
        const textarea = textareaRef.current;

        if (!textarea) {
            return;
        }

        textarea.style.height = "auto";

        textarea.style.height = `${Math.min(
            textarea.scrollHeight,
            180
        )}px`;
    }, [input]);

    /*
     * Send message.
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

            setMessages((previous) =>
                previous.filter(
                    (message) =>
                        message.id !==
                        temporaryUserMessage.id
                )
            );

            setInput(content);
        } finally {
            setSending(false);
        }
    };

    /*
     * Enter = send
     * Shift + Enter = newline
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
     * Example question.
     */
    const handleExampleQuestion = (
        question: string
    ) => {
        setInput(question);

        requestAnimationFrame(() => {
            textareaRef.current?.focus();
        });
    };

    /*
     * Loading state.
     */
    if (loadingMessages) {
        return (
            <main className="min-h-screen bg-[#07070a] text-white">
                <header className="border-b border-white/[0.07] bg-[#07070a]/90 backdrop-blur-xl">
                    <div className="mx-auto flex h-[68px] max-w-6xl items-center px-5 sm:px-8">
                        <Link
                            to="/"
                            className="group flex cursor-pointer items-center gap-2.5"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/15">
                                <span className="text-sm font-semibold">
                                    E
                                </span>
                            </div>

                            <span className="text-[16px] font-semibold tracking-[-0.02em]">
                                ExplainThisAI
                            </span>
                        </Link>
                    </div>
                </header>

                <div className="flex min-h-[calc(100vh-68px)] items-center justify-center">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin text-violet-400" />
                        Loading conversation
                    </div>
                </div>
            </main>
        );
    }

    const documents =
        conversation?.documents || [];

    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#07070a] text-white">
            {/* Background */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute -left-[280px] -top-[280px] h-[600px] w-[600px] rounded-full bg-violet-600/[0.07] blur-[170px]" />

                <div className="absolute -bottom-[300px] -right-[240px] h-[600px] w-[600px] rounded-full bg-indigo-600/[0.06] blur-[170px]" />
            </div>

            {/* Header */}
            <header className="relative z-20 shrink-0 border-b border-white/[0.07] bg-[#07070a]/85 backdrop-blur-xl">
                <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
                    <Link
                        to="/login"
                        className="group flex cursor-pointer items-center gap-2.5"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/15 transition-shadow duration-200 group-hover:shadow-violet-500/25">
                            <span className="text-sm font-semibold">
                                E
                            </span>
                        </div>

                        <span className="text-[16px] font-semibold tracking-[-0.02em]">
                            ExplainThisAI
                        </span>
                    </Link>

                    {/* Conversation context */}
                    {documents.length > 0 && (
                        <div className="hidden items-center gap-2 sm:flex">
                            <div className="flex -space-x-1.5">
                                {documents
                                    .slice(0, 3)
                                    .map(
                                        ({
                                            document,
                                        }) => (
                                            <div
                                                key={
                                                    document.id
                                                }
                                                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#07070a] bg-violet-500/10 text-violet-300"
                                                title={
                                                    document.filename
                                                }
                                            >
                                                <FileText className="h-3.5 w-3.5" />
                                            </div>
                                        )
                                    )}
                            </div>

                            <span className="max-w-[220px] truncate text-xs text-gray-500">
                                {documents.length ===
                                1
                                    ? documents[0]
                                          .document
                                          .filename
                                    : `${documents.length} documents`}
                            </span>
                        </div>
                    )}
                </div>
            </header>

            {/* Main */}
            <section className="relative z-10 flex min-h-0 flex-1">
                <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 sm:px-6">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto py-8 sm:py-10">
                        {messages.length === 0 ? (
                            <EmptyState
                                documents={documents}
                                onQuestion={
                                    handleExampleQuestion
                                }
                            />
                        ) : (
                            <div className="space-y-8">
                                {messages.map(
                                    (message) => (
                                        <Message
                                            key={
                                                message.id
                                            }
                                            message={
                                                message
                                            }
                                        />
                                    )
                                )}

                                {sending && (
                                    <ThinkingMessage />
                                )}

                                <div
                                    ref={
                                        messagesEndRef
                                    }
                                />
                            </div>
                        )}
                    </div>

                    {/* Composer */}
                    <div className="relative shrink-0 pb-4 pt-3 sm:pb-6">
                        <div className="pointer-events-none absolute inset-x-0 -top-16 h-20 bg-gradient-to-t from-[#07070a] to-transparent" />

                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-[#101014]/95 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors focus-within:border-white/[0.16]">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(
                                    event
                                ) =>
                                    setInput(
                                        event.target
                                            .value
                                    )
                                }
                                onKeyDown={
                                    handleKeyDown
                                }
                                disabled={sending}
                                rows={1}
                                placeholder="Ask about your documents..."
                                className="block max-h-[180px] min-h-[54px] w-full resize-none overflow-y-auto bg-transparent px-4 pb-2 pt-4 text-[14px] leading-6 text-gray-100 outline-none placeholder:text-gray-600 disabled:opacity-50 sm:px-5"
                            />

                            <div className="flex items-center justify-between px-3 pb-3 sm:px-4">
                                <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                    <Paperclip className="h-3.5 w-3.5" />

                                    <span className="hidden sm:inline">
                                        {documents.length ===
                                        1
                                            ? "1 document"
                                            : `${documents.length} documents`}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        handleSend
                                    }
                                    disabled={
                                        sending ||
                                        !input.trim()
                                    }
                                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white text-gray-950 transition-all duration-200 hover:bg-gray-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                                    aria-label="Send message"
                                >
                                    {sending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <ArrowUp className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <p className="mt-2 text-center text-[10px] text-gray-700">
                            Enter to send · Shift + Enter for a new line
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

/*
 * Empty conversation
 */
interface EmptyStateProps {
    documents: Array<{
        document: {
            id: string;
            filename: string;
            pageCount: number | null;
            fileSize: number;
            status:
                | "PROCESSING"
                | "READY"
                | "FAILED";
        };
    }>;
    onQuestion: (question: string) => void;
}

const EmptyState = ({
    documents,
    onQuestion,
}: EmptyStateProps) => {
    const questions = [
        "Summarize these documents",
        "What are the main points?",
        "Explain the most important section",
    ];

    return (
        <div className="flex min-h-[calc(100vh-250px)] items-center justify-center">
            <div className="w-full max-w-2xl">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-violet-300">
                        <FileText className="h-5 w-5" />
                    </div>

                    <h1 className="mt-6 text-[28px] font-semibold tracking-[-0.04em] text-white sm:text-[34px]">
                        Ask about your documents.
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                        Ask a question, compare information, or
                        ask for an explanation from the documents
                        in this conversation.
                    </p>
                </div>

                {documents.length > 0 && (
                    <div className="mt-9 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
                        <div className="border-b border-white/[0.07] px-4 py-3">
                            <span className="text-xs font-medium text-gray-400">
                                Documents
                            </span>
                        </div>

                        <div className="divide-y divide-white/[0.06]">
                            {documents.map(
                                ({ document }) => (
                                    <div
                                        key={
                                            document.id
                                        }
                                        className="flex items-center gap-3 px-4 py-3"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/[0.08] text-violet-400">
                                            <FileText className="h-4 w-4" />
                                        </div>

                                        <span className="min-w-0 flex-1 truncate text-sm text-gray-300">
                                            {
                                                document.filename
                                            }
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {questions.map((question) => (
                        <button
                            key={question}
                            type="button"
                            onClick={() =>
                                onQuestion(
                                    question
                                )
                            }
                            className="cursor-pointer rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-3 text-left text-xs leading-5 text-gray-500 transition-all duration-200 hover:border-violet-400/20 hover:bg-violet-500/[0.04] hover:text-gray-300"
                        >
                            {question}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

/*
 * Message
 */
interface MessageProps {
    message: ChatMessage;
}

const Message = ({
    message,
}: MessageProps) => {
    const isUser = message.role === "USER";

    return (
        <div
            className={`flex ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div
                className={`max-w-[92%] sm:max-w-[78%] ${
                    isUser
                        ? "rounded-2xl rounded-br-md bg-violet-600/90 px-4 py-3.5 text-white shadow-lg shadow-violet-950/20"
                        : "w-full max-w-3xl"
                }`}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap text-[14px] leading-6">
                        {message.content}
                    </p>
                ) : (
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />

                            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-600">
                                ExplainThisAI
                            </span>
                        </div>

                        <p className="whitespace-pre-wrap text-[14px] leading-7 text-gray-300 sm:text-[15px]">
                            {cleanAIResponse(
                                message.content
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

/*
 * Thinking state
 */
const ThinkingMessage = () => {
    return (
        <div className="flex justify-start">
            <div className="w-full max-w-3xl">
                <div className="mb-2 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />

                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-600">
                        ExplainThisAI
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-400" />
                    <span>Working through the documents...</span>
                </div>
            </div>
        </div>
    );
};

export default Chat;