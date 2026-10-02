import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    ArrowRight,
    FileText,
    Loader2,
    Sparkles,
    Upload,
    X,
} from "lucide-react";

import { toast } from "react-hot-toast";

import { uploadDocuments } from "../api/documents.api";
import { createConversation } from "../api/conversation.api";

const Dashboard = () => {
    const navigate = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [dragging, setDragging] = useState(false);

    const addFiles = (selectedFiles: File[]) => {
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
            const existingFiles = new Set(
                previousFiles.map(
                    (file) => `${file.name}-${file.size}`
                )
            );

            const newFiles = pdfFiles.filter(
                (file) =>
                    !existingFiles.has(
                        `${file.name}-${file.size}`
                    )
            );

            const combinedFiles = [
                ...previousFiles,
                ...newFiles,
            ];

            if (combinedFiles.length > 10) {
                toast.error(
                    "You can upload up to 10 PDFs at once."
                );

                return combinedFiles.slice(0, 10);
            }

            return combinedFiles;
        });
    };

    const handleFileSelect = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = Array.from(
            event.target.files || []
        );

        addFiles(selectedFiles);

        event.target.value = "";
    };

    const handleDragOver = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();

        if (
            event.currentTarget.contains(
                event.relatedTarget as Node
            )
        ) {
            return;
        }

        setDragging(false);
    };

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();

        setDragging(false);

        const droppedFiles = Array.from(
            event.dataTransfer.files
        );

        addFiles(droppedFiles);
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
            const response = await uploadDocuments(files);

            if (!response.success) {
                throw new Error(response.message);
            }

            const documentIds =
                response.data.documents.map(
                    (document) => document.id
                );

            const conversationResponse =
                await createConversation(documentIds);

            if (!conversationResponse.success) {
                throw new Error(
                    conversationResponse.message
                );
            }

            const conversationId =
                conversationResponse.data.conversation.id;

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
        <main className="relative min-h-screen overflow-hidden bg-[#07070a] text-white">

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="pointer-events-none fixed inset-0">

                <div className="absolute left-[-220px] top-[-220px] h-[560px] w-[560px] rounded-full bg-violet-600/[0.09] blur-[160px]" />

                <div className="absolute bottom-[-240px] right-[-180px] h-[520px] w-[520px] rounded-full bg-indigo-600/[0.07] blur-[160px]" />

                <div
                    className="absolute inset-0 opacity-[0.018]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                        backgroundSize: "72px 72px",
                    }}
                />

            </div>


            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="relative z-20 border-b border-white/[0.07] bg-[#07070a]/80 backdrop-blur-xl">

                <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8">

                    <Link
                        to="/login"
                        className="group flex cursor-pointer items-center gap-2.5"
                    >

                        {/* ExplainThisAI logo */}

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20 transition duration-300 group-hover:shadow-violet-500/30">

                            <Sparkles className="h-3.5 w-3.5 text-white" />

                        </div>


                        <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
                            ExplainThisAI
                        </span>

                    </Link>

                </div>

            </header>


            {/* =====================================================
                MAIN
            ===================================================== */}

            <section className="relative z-10 mx-auto flex min-h-[calc(100vh-68px)] max-w-6xl items-center px-5 py-10 sm:px-8">

                <div className="w-full">

                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <div className="mx-auto max-w-2xl text-center">

                        <h1 className="text-[36px] font-semibold tracking-[-0.05em] text-white sm:text-[46px]">
                            Start with your documents.
                        </h1>

                        <p className="mx-auto mt-4 max-w-lg text-[14px] leading-6 text-gray-500 sm:text-[15px]">
                            Upload one or more PDFs and start a
                            conversation with them.
                        </p>

                    </div>


                    {/* =================================================
                        WORKSPACE
                    ================================================= */}

                    <div className="mx-auto mt-9 max-w-[820px]">

                        <div
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                                overflow-hidden rounded-2xl border
                                bg-[#0c0c10]/90
                                shadow-[0_24px_80px_rgba(0,0,0,0.25)]
                                transition-all duration-200
                                ${
                                    dragging
                                        ? "border-violet-400/50 shadow-[0_24px_90px_rgba(139,92,246,0.10)]"
                                        : "border-white/[0.09] hover:border-white/[0.14]"
                                }
                            `}
                        >

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                multiple
                                className="hidden"
                                onChange={handleFileSelect}
                            />


                            {/* =================================================
                                UPLOAD AREA
                            ================================================= */}

                            <div
                                className={`
                                    relative flex min-h-[270px]
                                    cursor-pointer flex-col items-center
                                    justify-center px-6 py-12
                                    text-center
                                    transition-colors duration-200
                                    ${
                                        dragging
                                            ? "bg-violet-500/[0.035]"
                                            : "bg-white/[0.012]"
                                    }
                                `}
                            >

                                <div
                                    className={`
                                        flex h-14 w-14 items-center
                                        justify-center rounded-xl
                                        border transition-all duration-200
                                        ${
                                            dragging
                                                ? "border-violet-400/30 bg-violet-500/10 text-violet-300"
                                                : "border-white/[0.08] bg-white/[0.04] text-gray-300"
                                        }
                                    `}
                                >
                                    <Upload className="h-5 w-5" />
                                </div>


                                <h2 className="mt-5 text-[17px] font-medium text-gray-100">
                                    {dragging
                                        ? "Drop your PDFs here"
                                        : "Upload your PDFs"}
                                </h2>


                                <p className="mt-2 text-sm text-gray-500">
                                    Drag and drop files here or click
                                    to browse
                                </p>


                                <p className="mt-5 text-[11px] tracking-wide text-gray-600">
                                    PDF only&nbsp;&nbsp;·&nbsp;&nbsp;
                                    10 MB per file&nbsp;&nbsp;·&nbsp;&nbsp;
                                    Up to 10 files
                                </p>

                            </div>


                            {/* =================================================
                                SELECTED FILES
                            ================================================= */}

                            {files.length > 0 && (

                                <div
                                    onClick={(event) =>
                                        event.stopPropagation()
                                    }
                                    className="border-t border-white/[0.07] bg-[#0a0a0d] px-4 py-4 sm:px-5"
                                >

                                    <div className="mb-3 flex items-center justify-between">

                                        <div className="flex items-baseline gap-2">

                                            <p className="text-sm font-medium text-gray-200">
                                                Selected files
                                            </p>

                                            <span className="text-xs text-gray-600">
                                                {files.length}/10
                                            </span>

                                        </div>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFiles([])
                                            }
                                            className="cursor-pointer text-xs text-gray-500 transition-colors hover:text-gray-200"
                                        >
                                            Clear all
                                        </button>

                                    </div>


                                    <div
                                        className={`
                                            space-y-2
                                            ${
                                                files.length > 4
                                                    ? "max-h-[230px] overflow-y-auto pr-1"
                                                    : ""
                                            }
                                        `}
                                    >

                                        {files.map((file) => (

                                            <div
                                                key={`${file.name}-${file.size}`}
                                                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-3 transition-colors hover:border-white/[0.10] hover:bg-white/[0.035]"
                                            >

                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/[0.08] text-violet-400">
                                                    <FileText className="h-4 w-4" />
                                                </div>


                                                <div className="min-w-0 flex-1">

                                                    <p className="truncate text-[13px] text-gray-200">
                                                        {file.name}
                                                    </p>

                                                    <p className="mt-0.5 text-[11px] text-gray-600">
                                                        {formatFileSize(
                                                            file.size
                                                        )}
                                                    </p>

                                                </div>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFile(
                                                            file.name
                                                        )
                                                    }
                                                    className="cursor-pointer rounded-md p-1.5 text-gray-600 opacity-70 transition-all hover:bg-white/[0.06] hover:text-gray-300 hover:opacity-100"
                                                    aria-label={`Remove ${file.name}`}
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>

                                            </div>

                                        ))}

                                    </div>


                                    {/* Continue */}

                                    <button
                                        type="button"
                                        onClick={handleUpload}
                                        disabled={uploading}
                                        className="group mt-4 flex h-11.5 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-gray-950 transition-all duration-200 hover:bg-gray-100 active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-60"
                                    >

                                        {uploading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                Continue with{" "}
                                                {files.length}{" "}
                                                {files.length === 1
                                                    ? "document"
                                                    : "documents"}

                                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                            </>
                                        )}

                                    </button>

                                </div>

                            )}

                        </div>


                        {/* =================================================
                            BOTTOM INFO
                        ================================================= */}

                        <div className="mt-5 flex items-center justify-center gap-3 text-[11px] text-gray-600">

                            <span>
                                Multiple PDFs can be used together.
                            </span>

                            <span className="h-1 w-1 rounded-full bg-gray-700" />

                            <span>
                                Your files stay with this conversation.
                            </span>

                        </div>

                    </div>

                </div>

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