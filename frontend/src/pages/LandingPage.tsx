import { Link } from "react-router-dom";
import {
    ArrowRight,
    FileText,
    MessageCircle,
    Sparkles,
    Upload,
} from "lucide-react";

export const LandingPage = () => {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* Navbar */}
            <nav className="border-b border-gray-100">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                    <Link
                        to="/"
                        className="text-lg font-semibold tracking-tight"
                    >
                        ExplainThisAI
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 sm:block"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pt-32">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-600">
                        <Sparkles className="h-4 w-4" />
                        Understand your documents with AI
                    </div>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Your documents.
                        <br />
                        <span className="text-gray-400">
                            Your questions. Simple answers.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                        Upload your PDFs and ask questions in plain
                        language. ExplainThisAI helps you find and
                        understand the information you need without
                        digging through pages of documents.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            to="/register"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 sm:w-auto"
                        >
                            Start exploring
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            to="/login"
                            className="w-full rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                        >
                            I already have an account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Simple product visual */}
            <section className="px-5 pb-20 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-5xl">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
                        {/* Fake app header */}
                        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex items-center gap-2">
                                <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                                <span className="text-sm font-medium">
                                    ExplainThisAI
                                </span>
                            </div>

                            <div className="hidden text-xs text-gray-400 sm:block">
                                Your document workspace
                            </div>
                        </div>

                        <div className="grid min-h-70 grid-cols-1 md:grid-cols-[220px_1fr]">
                            {/* Documents */}
                            <div className="hidden border-r border-gray-200 bg-white p-4 md:block">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Documents
                                </p>

                                <div className="rounded-lg bg-gray-100 p-3">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-gray-500" />

                                        <div>
                                            <p className="text-xs font-medium">
                                                Resume.pdf
                                            </p>
                                            <p className="text-[11px] text-gray-400">
                                                Ready to chat
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat */}
                            <div className="flex flex-col justify-between p-5 sm:p-8">
                                <div className="space-y-5">
                                    <div className="max-w-md rounded-2xl rounded-bl-md bg-gray-900 px-4 py-3 text-sm leading-6 text-white">
                                        What projects are mentioned
                                        in this document?
                                    </div>

                                    <div className="ml-auto max-w-md rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm leading-6 text-gray-600 shadow-sm ring-1 ring-gray-200">
                                        I found three projects in your
                                        document. They include...
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                                    <MessageCircle className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm text-gray-400">
                                        Ask something about your document...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="border-y border-gray-100 bg-gray-50 px-5 py-20 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-5xl">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold text-gray-500">
                            HOW IT WORKS
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            From document to answer in a few steps.
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            No need to search through every page. Give
                            ExplainThisAI your documents and start asking
                            questions.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <Step
                            number="01"
                            icon={<Upload className="h-5 w-5" />}
                            title="Upload"
                            description="Upload the PDF documents you want to understand."
                        />

                        <Step
                            number="02"
                            icon={<MessageCircle className="h-5 w-5" />}
                            title="Ask"
                            description="Ask questions naturally, just like you would ask a person."
                        />

                        <Step
                            number="03"
                            icon={<Sparkles className="h-5 w-5" />}
                            title="Understand"
                            description="Get clear answers based on the information in your documents."
                        />
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="px-5 py-20 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-12 md:grid-cols-2 md:items-center">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">
                                BUILT FOR DOCUMENTS
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                                Stop searching.
                                <br />
                                Start asking.
                            </h2>

                            <p className="mt-5 leading-7 text-gray-600">
                                Whether you're working with a resume,
                                research paper, notes, or another PDF,
                                ExplainThisAI gives you a simple way to
                                interact with your documents.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Benefit
                                title="Ask questions naturally"
                                description="No special commands or complicated search syntax."
                            />

                            <Benefit
                                title="Keep conversations connected"
                                description="Continue asking follow-up questions without starting over."
                            />

                            <Benefit
                                title="Work with multiple documents"
                                description="Choose the documents relevant to your conversation."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-5 pb-20 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-gray-900 px-6 py-14 text-center text-white sm:px-10">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Ready to understand your documents?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
                        Upload your first document and start asking
                        questions.
                    </p>

                    <Link
                        to="/register"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
                    >
                        Get started
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-100 px-5 py-8 sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-gray-400 sm:flex-row">
                    <p>© 2026 ExplainThisAI</p>

                    <p>
                        Understand more. Search less.
                    </p>
                </div>
            </footer>
        </main>
    );
};

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
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    {icon}
                </div>

                <span className="text-sm font-medium text-gray-300">
                    {number}
                </span>
            </div>

            <h3 className="mt-6 font-semibold">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
            </p>
        </div>
    );
};

interface BenefitProps {
    title: string;
    description: string;
}

const Benefit = ({
    title,
    description,
}: BenefitProps) => {
    return (
        <div className="rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold">{title}</h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
                {description}
            </p>
        </div>
    );
};