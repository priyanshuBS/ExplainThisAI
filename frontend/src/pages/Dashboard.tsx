import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FileText,
    Upload,
    X,
    ArrowRight,
    Sparkles,
    Loader2,
} from "lucide-react";

import { toast } from "react-hot-toast";

import { uploadDocuments } from "../api/documents.api";
import { createConversation } from "../api/conversation.api";

const Dashboard = () => {
    const navigate = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = Array.from(
            event.target.files || []
        );

        if (selectedFiles.length === 0) {
            return;
        }

        const pdfFiles = selectedFiles.filter(
            (file) => file.type === "application/pdf"
        );

        if (pdfFiles.length !== selectedFiles.length) {
            toast.error("Only PDF files are allowed.");
        }

        setFiles((previousFiles) => {
            const existingNames = new Set(
                previousFiles.map((file) => file.name)
            );

            const newFiles = pdfFiles.filter(
                (file) => !existingNames.has(file.name)
            );

            return [...previousFiles, ...newFiles];
        });

        event.target.value = "";
    };

    const removeFile = (fileName: string) => {
        setFiles((previousFiles) =>
            previousFiles.filter(
                (file) => file.name !== fileName
            )
        );
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            toast.error("Please select at least one PDF.");
            return;
        }

        setUploading(true);

        try {
            // 1. Upload documents
            const response = await uploadDocuments(files);

            if (!response.success) {
                throw new Error(response.message);
            }

            // 2. Get uploaded document IDs
            const documentIds =
                response.data.documents.map(
                    (document) => document.id
                );

            // 3. Create conversation with uploaded documents
            const conversationResponse =
                await createConversation(documentIds);

            if (!conversationResponse.success) {
                throw new Error(
                    conversationResponse.message
                );
            }

            // 4. Get conversation ID
            const conversationId =
                conversationResponse.data.conversation.id;

            // 5. Navigate to chat
            navigate(`/chat/${conversationId}`);

        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                    error.message ||
                    "Something went wrong."
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#07070a] text-white">
            {/* Background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-[-150px] top-[-150px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px]" />

                <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[130px]" />

                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* Navbar */}
            <header className="relative z-10 border-b border-white/10 bg-[#07070a]/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20">
                            <Sparkles className="h-4 w-4" />
                        </div>

                        <span className="text-lg font-semibold tracking-tight">
                            ExplainThisAI
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden text-sm text-gray-400 sm:block">
                            Document Workspace
                        </div>

                        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-gray-300">
                            P
                        </button>
                    </div>
                </div>
            </header>

            {/* Main */}
            <section className="relative z-10 mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-20">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-3 py-1.5 text-xs text-violet-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        AI document workspace
                    </div>

                    <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                        Upload your documents
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-gray-400 sm:text-base">
                        Upload one or multiple PDFs and start asking
                        questions about them.
                    </p>
                </div>

                {/* Upload area */}
                <div
                    onClick={() =>
                        fileInputRef.current?.click()
                    }
                    className="group mx-auto mt-10 max-w-3xl cursor-pointer rounded-3xl border border-dashed border-white/15 bg-white/[0.025] p-8 transition hover:border-violet-400/40 hover:bg-violet-500/[0.03] sm:p-12"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        multiple
                        className="hidden"
                        onChange={handleFileSelect}
                    />

                    <div className="mx-auto flex max-w-md flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 transition group-hover:scale-105 group-hover:bg-violet-500/15">
                            <Upload className="h-7 w-7" />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold">
                            Drop your PDFs here
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            or click to browse from your computer
                        </p>

                        <div className="mt-5 text-xs text-gray-600">
                            PDF files · Maximum 10 MB per file · Up to 10
                            files
                        </div>
                    </div>
                </div>

                {/* Selected files */}
                {files.length > 0 && (
                    <div className="mx-auto mt-8 max-w-3xl">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-semibold">
                                    Selected documents
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    {files.length} document
                                    {files.length > 1 ? "s" : ""} selected
                                </p>
                            </div>

                            <button
                                onClick={() => setFiles([])}
                                className="text-xs text-gray-500 transition hover:text-white"
                            >
                                Clear all
                            </button>
                        </div>

                        <div className="space-y-3">
                            {files.map((file) => (
                                <div
                                    key={`${file.name}-${file.size}`}
                                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                                        <FileText className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-200">
                                            {file.name}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            removeFile(file.name)
                                        }
                                        className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
                                        aria-label={`Remove ${file.name}`}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="group mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-gray-950 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Uploading documents...
                                </>
                            ) : (
                                <>
                                    Upload and continue
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
};

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default Dashboard;