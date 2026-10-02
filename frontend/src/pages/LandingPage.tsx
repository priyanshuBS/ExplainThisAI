import { Link } from "react-router-dom";
import {
    ArrowRight,
    FileText,
    MessageCircle,
    Sparkles,
    Upload,
} from "lucide-react";

const LandingPage = () => {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#fafafa] text-gray-950">

            {/* =========================================================
                NAVBAR
            ========================================================= */}

            <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#07070a]/80 backdrop-blur-2xl">
                <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

                    <Link
                        to="/"
                        className="group flex cursor-pointer items-center gap-2.5"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20 transition duration-300 group-hover:shadow-violet-500/30">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                        </div>

                        <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
                            ExplainThisAI
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-5">

                        <Link
                            to="/login"
                            className="hidden cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white sm:block"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="group flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-950 shadow-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
                        >
                            Get started

                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>

                    </div>
                </div>
            </nav>


            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative overflow-hidden bg-[#07070a] pt-24 text-white sm:pt-28">

                <div className="pointer-events-none absolute left-1/2 top-[-250px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/[0.13] blur-[150px]" />

                <div className="pointer-events-none absolute right-[-250px] top-[280px] h-[450px] w-[450px] rounded-full bg-indigo-600/[0.07] blur-[130px]" />

                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.045]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                    }}
                />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

                    {/* Hero copy */}

                    <div className="mx-auto max-w-4xl text-center">

                        <div className="mb-5 flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-violet-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                            Your documents, in conversation
                        </div>

                        <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">

                            Your documents.

                            <br />

                            <span className="bg-gradient-to-r from-violet-300 via-white to-indigo-300 bg-clip-text text-transparent">
                                Your questions.
                            </span>

                            <br />

                            <span className="text-gray-500">
                                Clear answers.
                            </span>

                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-gray-400 sm:text-base">
                            Upload your PDFs, ask questions about what
                            matters, and keep the entire conversation in one
                            place.
                        </p>

                        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">

                            <Link
                                to="/register"
                                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-gray-950 shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 sm:w-auto"
                            >
                                Start for free

                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/login"
                                className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.035] px-6 py-3.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.07] hover:text-white sm:w-auto"
                            >
                                I already have an account
                            </Link>

                        </div>

                        <p className="mt-4 text-[11px] text-gray-600">
                            Simple email & password signup
                        </p>

                    </div>


                    {/* =================================================
                        PRODUCT PREVIEW
                    ================================================= */}

                    <div className="relative mx-auto mt-16 max-w-6xl pb-24 sm:mt-20">

                        <div className="pointer-events-none absolute inset-x-12 top-16 bottom-0 rounded-[32px] bg-violet-600/[0.14] blur-[110px]" />

                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#101014] shadow-[0_40px_120px_rgba(0,0,0,0.55)]">

                            {/* Browser bar */}

                            <div className="flex h-12 items-center border-b border-white/[0.07] bg-[#141417] px-4 sm:px-5">

                                <div className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                </div>

                                <div className="mx-auto hidden h-6 w-72 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.025] sm:flex">
                                    <span className="text-[10px] text-gray-600">
                                        app.explainthisai.com
                                    </span>
                                </div>

                                <div className="w-[42px]" />

                            </div>


                            {/* Application */}

                            <div className="grid min-h-[500px] grid-cols-1 md:grid-cols-[235px_1fr]">

                                {/* Sidebar */}

                                <aside className="hidden border-r border-white/[0.07] bg-[#0c0c0f] md:block">

                                    <div className="flex h-14 items-center border-b border-white/[0.07] px-4">

                                        <div className="flex items-center gap-2">

                                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-500">
                                                <Sparkles className="h-3 w-3 text-white" />
                                            </div>

                                            <span className="text-[11px] font-semibold text-gray-300">
                                                ExplainThisAI
                                            </span>

                                        </div>

                                    </div>

                                    <div className="p-4">

                                        <div className="mb-3 flex items-center justify-between">

                                            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-600">
                                                Documents
                                            </span>

                                            <Upload className="h-3 w-3 text-gray-600" />

                                        </div>

                                        <div className="rounded-lg border border-violet-500/20 bg-violet-500/[0.07] p-3">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/10">

                                                    <FileText className="h-3.5 w-3.5 text-red-400" />

                                                </div>

                                                <div className="min-w-0">

                                                    <p className="truncate text-[11px] font-medium text-gray-200">
                                                        Resume.pdf
                                                    </p>

                                                    <p className="mt-1 text-[9px] text-gray-600">
                                                        1 page
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="mt-2 rounded-lg p-3 opacity-50">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.04]">

                                                    <FileText className="h-3.5 w-3.5 text-gray-500" />

                                                </div>

                                                <div className="min-w-0">

                                                    <p className="truncate text-[11px] text-gray-400">
                                                        Research.pdf
                                                    </p>

                                                    <p className="mt-1 text-[9px] text-gray-700">
                                                        8 pages
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </aside>


                                {/* Main chat */}

                                <div className="flex min-w-0 flex-col bg-[#111114]">

                                    <div className="flex h-14 items-center justify-between border-b border-white/[0.07] px-5 sm:px-7">

                                        <div>

                                            <p className="text-[11px] font-medium text-gray-200">
                                                Resume.pdf
                                            </p>

                                            <p className="mt-0.5 text-[9px] text-gray-600">
                                                Conversation
                                            </p>

                                        </div>

                                        <div className="hidden text-[9px] text-gray-600 sm:block">
                                            1 document
                                        </div>

                                    </div>


                                    <div className="flex flex-1 flex-col p-5 sm:p-8">

                                        <div className="ml-auto max-w-md">

                                            <div className="rounded-xl rounded-br-sm bg-white px-4 py-3 shadow-lg">

                                                <p className="text-xs leading-5 text-gray-900">
                                                    What projects are mentioned
                                                    in this document?
                                                </p>

                                            </div>

                                            <p className="mt-2 text-right text-[9px] text-gray-700">
                                                You
                                            </p>

                                        </div>


                                        <div className="mt-8 max-w-xl">

                                            <div className="border-l-2 border-violet-500/40 pl-4">

                                                <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-violet-400">
                                                    ExplainThisAI
                                                </p>

                                                <p className="mt-3 text-xs leading-6 text-gray-400">
                                                    I found three projects in
                                                    your document. They include
                                                    a document-based application,
                                                    a web platform, and an IoT
                                                    project.
                                                </p>

                                            </div>

                                        </div>


                                        <div className="mt-auto pt-10">

                                            <div className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 py-3">

                                                <MessageCircle className="h-3.5 w-3.5 text-gray-700" />

                                                <span className="flex-1 text-[10px] text-gray-700">
                                                    Ask something about your
                                                    document...
                                                </span>

                                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/10">

                                                    <ArrowRight className="h-3 w-3 text-violet-400" />

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                PRODUCT STATEMENT
            ========================================================= */}

            <section className="border-b border-gray-200 bg-white px-5 py-24 sm:px-8 sm:py-28 lg:px-10">

                <div className="mx-auto max-w-7xl">

                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        <div>

                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">
                                One simple workflow
                            </p>

                            <h2 className="mt-5 max-w-md text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-4xl">
                                Put the document first.
                            </h2>

                        </div>

                        <div>

                            <p className="max-w-2xl text-lg leading-8 tracking-[-0.015em] text-gray-500 sm:text-xl">
                                Upload the files you need, ask your questions,
                                and keep the conversation tied to those
                                documents.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-gray-200 pt-6">

                                <span className="text-sm text-gray-500">
                                    Multiple PDFs
                                </span>

                                <span className="text-sm text-gray-500">
                                    Follow-up questions
                                </span>

                                <span className="text-sm text-gray-500">
                                    Conversation history
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                WORKFLOW
            ========================================================= */}

            <section className="bg-[#f7f7f8] px-5 py-24 sm:px-8 sm:py-28 lg:px-10">

                <div className="mx-auto max-w-7xl">

                    <div className="max-w-xl">

                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">
                            The workflow
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                            From PDF to conversation.
                        </h2>

                    </div>


                    <div className="mt-14 grid gap-5 md:grid-cols-3">

                        <WorkflowCard
                            number="01"
                            title="Upload"
                            description="Bring in one PDF or several documents you want to work with."
                        />

                        <WorkflowCard
                            number="02"
                            title="Ask"
                            description="Ask questions about the information inside your documents."
                        />

                        <WorkflowCard
                            number="03"
                            title="Continue"
                            description="Keep asking follow-up questions without losing the conversation."
                        />

                    </div>

                </div>

            </section>


            {/* =========================================================
                FINAL CTA
            ========================================================= */}

            <section className="bg-[#07070a] px-5 py-24 text-white sm:px-8 sm:py-28 lg:px-10">

                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101014]">

                    <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/[0.1] blur-[120px]" />

                    <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">

                        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                            Start with your first document.
                        </h2>

                        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-500">
                            Upload a PDF and start a conversation with it.
                        </p>

                        <Link
                            to="/register"
                            className="group mt-8 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-gray-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100"
                        >
                            Get started

                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>

                    </div>

                </div>

            </section>


            {/* =========================================================
                FOOTER
            ========================================================= */}

            <footer className="border-t border-white/[0.08] bg-[#07070a] px-5 py-8 text-gray-500 sm:px-8 lg:px-10">

                <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <Link
                        to="/"
                        className="flex cursor-pointer items-center gap-2 text-gray-300"
                    >
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-500">
                            <Sparkles className="h-3 w-3 text-white" />
                        </div>

                        <span className="text-xs font-medium">
                            ExplainThisAI
                        </span>
                    </Link>

                    <div className="flex items-center gap-5 text-xs">

                        <Link
                            to="/login"
                            className="cursor-pointer transition-colors hover:text-gray-300"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="cursor-pointer transition-colors hover:text-gray-300"
                        >
                            Get started
                        </Link>

                    </div>

                </div>

            </footer>

        </main>
    );
};


/* =========================================================
   WORKFLOW CARD
========================================================= */

interface WorkflowCardProps {
    number: string;
    title: string;
    description: string;
}

const WorkflowCard = ({
    number,
    title,
    description,
}: WorkflowCardProps) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:p-8">

            <span className="text-[11px] font-semibold tracking-[0.2em] text-violet-500">
                {number}
            </span>

            <div className="mt-16">

                <h3 className="text-lg font-semibold tracking-[-0.025em] text-gray-950">
                    {title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                    {description}
                </p>

            </div>

            <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-violet-500/[0.035] blur-2xl transition-all duration-300 group-hover:bg-violet-500/[0.08]" />

        </div>
    );
};

export default LandingPage;