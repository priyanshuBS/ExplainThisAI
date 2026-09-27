import { Link } from "react-router-dom";
import {
    ArrowRight,
    Check,
    FileText,
    MessageCircle,
    Sparkles,
    Upload,
    Zap,
} from "lucide-react";

export const LandingPage = () => {
    return (
        <main className="min-h-screen overflow-hidden bg-[#fafafa] text-gray-950">

            {/* ================= NAVBAR ================= */}
            <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>

                        ExplainThisAI
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <Link
                            to="/login"
                            className="hidden px-3 py-2 text-sm font-medium text-gray-300 transition hover:text-white sm:block"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="group flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
                        >
                            Get started
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </nav>


            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden bg-[#07070a] pt-32 text-white sm:pt-40">

                {/* Background glow */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

                <div className="pointer-events-none absolute right-[-200px] top-[300px] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />

                {/* Grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

                    <div className="mx-auto max-w-4xl text-center">

                        {/* Badge */}
                        <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-gray-300 backdrop-blur-sm">
                            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                            AI-powered document intelligence
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                            Your documents.
                            <br />

                            <span className="bg-gradient-to-r from-violet-300 via-white to-indigo-300 bg-clip-text text-transparent">
                                Your questions.
                            </span>

                            <br />

                            <span className="text-gray-500">
                                Instant answers.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
                            Upload your PDFs and talk to them like a person.
                            Find information, understand complex content,
                            and get answers without searching through pages.
                        </p>

                        {/* CTA */}
                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

                            <Link
                                to="/register"
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-950 shadow-xl shadow-white/10 transition hover:-translate-y-0.5 hover:bg-gray-100 sm:w-auto"
                            >
                                Start for free
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/login"
                                className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-gray-300 backdrop-blur-sm transition hover:bg-white/[0.08] hover:text-white sm:w-auto"
                            >
                                I already have an account
                            </Link>

                        </div>

                        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Check className="h-3.5 w-3.5 text-violet-400" />
                            Simple email & password signup
                        </div>
                    </div>


                    {/* ================= PRODUCT PREVIEW ================= */}
                    <div className="relative mx-auto mt-20 max-w-5xl pb-24">

                        {/* Glow */}
                        <div className="absolute inset-x-10 bottom-0 top-10 rounded-[2rem] bg-violet-600/20 blur-[100px]" />

                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111114] shadow-2xl shadow-black/50">

                            {/* Window header */}
                            <div className="flex h-12 items-center justify-between border-b border-white/10 bg-[#161619] px-4 sm:px-6">

                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                                    </div>

                                    <div className="hidden h-4 w-px bg-white/10 sm:block" />

                                    <span className="text-xs font-medium text-gray-400">
                                        ExplainThisAI
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    AI ready
                                </div>
                            </div>


                            {/* App */}
                            <div className="grid min-h-[420px] grid-cols-1 md:grid-cols-[230px_1fr]">

                                {/* Sidebar */}
                                <aside className="hidden border-r border-white/10 bg-[#0d0d10] p-4 md:block">

                                    <div className="mb-5 flex items-center justify-between">
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600">
                                            Documents
                                        </span>

                                        <Upload className="h-3.5 w-3.5 text-gray-600" />
                                    </div>

                                    <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.08] p-3">

                                        <div className="flex items-start gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                                                <FileText className="h-4 w-4 text-red-400" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-xs font-medium text-gray-200">
                                                    Resume.pdf
                                                </p>

                                                <div className="mt-1 flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                    <span className="text-[10px] text-gray-500">
                                                        Ready
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="mt-3 rounded-xl border border-white/5 p-3 opacity-50">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                                                <FileText className="h-4 w-4 text-gray-500" />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Research.pdf
                                                </p>
                                                <p className="mt-1 text-[10px] text-gray-600">
                                                    Ready
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </aside>


                                {/* Chat */}
                                <div className="flex flex-col bg-[#111114]">

                                    {/* Chat header */}
                                    <div className="border-b border-white/10 px-5 py-4 sm:px-7">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
                                                <Sparkles className="h-3.5 w-3.5 text-white" />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium text-gray-200">
                                                    Resume.pdf
                                                </p>
                                                <p className="text-[10px] text-gray-600">
                                                    Document conversation
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Messages */}
                                    <div className="flex-1 space-y-5 p-5 sm:p-8">

                                        {/* User */}
                                        <div className="ml-auto max-w-md">
                                            <div className="rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm leading-6 text-gray-900 shadow-lg">
                                                What projects are mentioned in
                                                this document?
                                            </div>

                                            <p className="mt-2 text-right text-[10px] text-gray-600">
                                                You
                                            </p>
                                        </div>


                                        {/* AI */}
                                        <div className="max-w-lg">

                                            <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-gray-300">

                                                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-violet-300">
                                                    <Sparkles className="h-3.5 w-3.5" />
                                                    ExplainThisAI
                                                </div>

                                                I found three projects in your
                                                document. They include a
                                                document-based AI application,
                                                a web platform, and an IoT
                                                project.

                                            </div>

                                            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-gray-600">
                                                <Check className="h-3 w-3" />
                                                Based on Resume.pdf
                                            </div>

                                        </div>

                                    </div>


                                    {/* Input */}
                                    <div className="border-t border-white/10 p-4 sm:p-5">

                                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition focus-within:border-violet-500/40">

                                            <MessageCircle className="h-4 w-4 text-gray-600" />

                                            <span className="flex-1 text-xs text-gray-600">
                                                Ask something about your document...
                                            </span>

                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
                                                <ArrowRight className="h-3.5 w-3.5 text-gray-600" />
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ================= TRUST / INTRO ================= */}
            <section className="border-b border-gray-200 bg-white px-5 py-16 sm:px-8 lg:px-10">

                <div className="mx-auto max-w-7xl">

                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                            Built for understanding
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
                            Stop reading every page.
                            <br />
                            Start asking questions.
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
                            ExplainThisAI turns your documents into an
                            interactive knowledge space where you can ask,
                            explore, and understand information naturally.
                        </p>

                    </div>

                </div>
            </section>


            {/* ================= HOW IT WORKS ================= */}
            <section className="bg-[#fafafa] px-5 py-24 sm:px-8 lg:px-10">

                <div className="mx-auto max-w-7xl">

                    <div className="max-w-xl">

                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                            <Zap className="h-3.5 w-3.5" />
                            How it works
                        </div>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                            From PDF to answer
                            <br />
                            in three simple steps.
                        </h2>

                    </div>


                    <div className="mt-14 grid gap-5 md:grid-cols-3">

                        <Step
                            number="01"
                            icon={<Upload className="h-5 w-5" />}
                            title="Upload"
                            description="Add the PDF documents you want to understand."
                        />

                        <Step
                            number="02"
                            icon={<MessageCircle className="h-5 w-5" />}
                            title="Ask"
                            description="Ask questions naturally, just like you would ask another person."
                        />

                        <Step
                            number="03"
                            icon={<Sparkles className="h-5 w-5" />}
                            title="Understand"
                            description="Get clear answers based on the information inside your documents."
                        />

                    </div>

                </div>
            </section>


            {/* ================= FEATURES ================= */}
            <section className="border-y border-gray-200 bg-white px-5 py-24 sm:px-8 lg:px-10">

                <div className="mx-auto max-w-7xl">

                    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                                Everything in one place
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                A smarter way to work
                                with your documents.
                            </h2>

                            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
                                Whether you're exploring a resume, research
                                paper, notes, or another PDF, your documents
                                become something you can actually talk to.
                            </p>

                            <Link
                                to="/register"
                                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-950"
                            >
                                Try ExplainThisAI
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            <FeatureCard
                                icon={<MessageCircle className="h-5 w-5" />}
                                title="Natural conversations"
                                description="Ask questions using normal language. No complicated search syntax."
                            />

                            <FeatureCard
                                icon={<Sparkles className="h-5 w-5" />}
                                title="Clear answers"
                                description="Get concise explanations instead of digging through pages."
                            />

                            <FeatureCard
                                icon={<FileText className="h-5 w-5" />}
                                title="Multiple documents"
                                description="Choose the documents that matter to your conversation."
                            />

                            <FeatureCard
                                icon={<Zap className="h-5 w-5" />}
                                title="Follow-up questions"
                                description="Keep the conversation going without starting over."
                            />

                        </div>

                    </div>

                </div>
            </section>


            {/* ================= FINAL CTA ================= */}
            <section className="bg-[#07070a] px-5 py-24 text-white sm:px-8 lg:px-10">

                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-[#121216] to-indigo-600/10 px-6 py-16 text-center sm:px-12">

                    <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

                    <div className="relative">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                            <Sparkles className="h-5 w-5 text-violet-300" />
                        </div>

                        <h2 className="mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Your documents have answers.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                            Upload your first document and start exploring
                            what's inside it with AI.
                        </p>

                        <Link
                            to="/register"
                            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
                        >
                            Get started for free
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="border-t border-white/10 bg-[#07070a] px-5 py-8 text-gray-500 sm:px-8 lg:px-10">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs sm:flex-row">

                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-500">
                            <Sparkles className="h-3 w-3 text-white" />
                        </div>

                        <span>ExplainThisAI</span>
                    </div>

                    <p>
                        Understand more. Search less.
                    </p>

                    <p>
                        © 2026 ExplainThisAI
                    </p>

                </div>

            </footer>

        </main>
    );
};


/* =========================================================
   STEP CARD
========================================================= */

interface StepProps {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Step = ({
    number,
    icon,
    title,
    description,
}: StepProps) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/[0.06]">

            <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                    {icon}
                </div>

                <span className="text-xs font-semibold tracking-widest text-gray-300">
                    {number}
                </span>

            </div>

            <h3 className="mt-7 text-base font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
            </p>

        </div>
    );
};


/* =========================================================
   FEATURE CARD
========================================================= */

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard = ({
    icon,
    title,
    description,
}: FeatureCardProps) => {
    return (
        <div className="group rounded-2xl border border-gray-200 bg-[#fafafa] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-lg hover:shadow-violet-500/[0.05]">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm ring-1 ring-gray-200 transition group-hover:bg-violet-600 group-hover:text-white group-hover:ring-violet-600">
                {icon}
            </div>

            <h3 className="mt-5 text-sm font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
            </p>

        </div>
    );
};