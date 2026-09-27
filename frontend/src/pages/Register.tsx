import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Sparkles,
    User,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        if (!email.trim()) {
            toast.error("Please enter your email.");
            return;
        }

        if (!password.trim()) {
            toast.error("Please enter a password.");
            return;
        }

        setLoading(true);

        try {
            await register({
                name,
                email,
                password,
            });

            toast.success("Account created successfully!");

            navigate("/");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                    "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#07070a] text-white">

            <div className="grid min-h-screen lg:grid-cols-2">

                {/* =====================================================
                    LEFT SIDE - BRAND
                ===================================================== */}

                <section className="relative hidden overflow-hidden lg:flex">

                    {/* Background */}

                    <div className="absolute inset-0 bg-[#07070a]" />

                    {/* Purple glow */}

                    <div className="absolute left-[-150px] top-[-100px] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[130px]" />

                    <div className="absolute bottom-[-150px] right-[-100px] h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[130px]" />

                    {/* Grid */}

                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />

                    <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

                        {/* Logo */}

                        <Link
                            to="/"
                            className="flex w-fit items-center gap-2 text-lg font-semibold tracking-tight"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20">
                                <Sparkles className="h-4 w-4" />
                            </div>

                            ExplainThisAI
                        </Link>


                        {/* Main content */}

                        <div className="max-w-lg">

                            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-400">
                                <Sparkles className="h-3.5 w-3.5 text-violet-400" />

                                AI-powered document intelligence
                            </div>


                            <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em] xl:text-6xl">

                                Meet your new

                                <br />

                                <span className="bg-gradient-to-r from-violet-300 via-white to-indigo-300 bg-clip-text text-transparent">
                                    document assistant.
                                </span>

                            </h1>


                            <p className="mt-7 max-w-md text-base leading-7 text-gray-400">
                                Upload your documents, ask questions,
                                and understand the information inside
                                them without spending hours searching.
                            </p>


                            {/* Features */}

                            <div className="mt-8 space-y-3">

                                <Feature
                                    text="Turn documents into conversations"
                                />

                                <Feature
                                    text="Ask questions in natural language"
                                />

                                <Feature
                                    text="Get answers grounded in your documents"
                                />

                            </div>

                        </div>


                        {/* Footer text */}

                        <p className="text-xs text-gray-600">
                            Understand more. Search less.
                        </p>

                    </div>

                </section>


                {/* =====================================================
                    RIGHT SIDE - REGISTER
                ===================================================== */}

                <section className="relative flex min-h-screen items-center justify-center bg-[#fafafa] px-5 py-12 text-gray-950 sm:px-8">

                    {/* Mobile glow */}

                    <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">

                        <div className="absolute left-1/2 top-[-150px] h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

                    </div>


                    <div className="relative w-full max-w-md">

                        {/* Mobile logo */}

                        <div className="mb-10 flex items-center justify-between lg:hidden">

                            <Link
                                to="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </div>

                                ExplainThisAI
                            </Link>

                            <Link
                                to="/"
                                className="flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-950"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Home
                            </Link>

                        </div>


                        {/* Header */}

                        <div>

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">

                                <Sparkles className="h-5 w-5" />

                            </div>


                            <h2 className="text-3xl font-semibold tracking-tight">
                                Create your account
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Start exploring your documents with
                                ExplainThisAI.
                            </p>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* Name */}

                            <div>

                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-800"
                                >
                                    Full name
                                </label>

                                <div className="relative">

                                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Your name"
                                        autoComplete="name"
                                        required
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                    />

                                </div>

                            </div>


                            {/* Email */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-800"
                                >
                                    Email address
                                </label>

                                <div className="relative">

                                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div>

                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-800"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        required
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-12 text-sm outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                    />


                                    {/* Show / hide password */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) => !previous
                                            )
                                        }
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>

                                </div>

                                <p className="mt-2 text-xs text-gray-400">
                                    Use a strong password to keep your
                                    account secure.
                                </p>

                            </div>


                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 text-sm font-semibold text-white shadow-lg shadow-gray-950/10 transition hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                            >

                                {loading ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create account

                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}

                            </button>

                        </form>


                        {/* Login */}

                        <p className="mt-7 text-center text-sm text-gray-500">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-semibold text-gray-950 transition hover:text-violet-600"
                            >
                                Login
                            </Link>

                        </p>


                        {/* Footer */}

                        <div className="mt-10 border-t border-gray-200 pt-6 text-center">

                            <Link
                                to="/"
                                className="inline-flex items-center gap-1.5 text-xs text-gray-400 transition hover:text-gray-700"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />

                                Back to ExplainThisAI
                            </Link>

                        </div>

                    </div>

                </section>

            </div>
        </main>
    );
};


/* =========================================================
   FEATURE
========================================================= */

interface FeatureProps {
    text: string;
}

const Feature = ({ text }: FeatureProps) => {
    return (
        <div className="flex items-center gap-3 text-sm text-gray-400">

            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            </div>

            {text}

        </div>
    );
};

export default Register;