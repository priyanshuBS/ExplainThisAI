import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
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

            navigate("/dashboard");
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
            <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">

                {/* =====================================================
                    LEFT SIDE
                ===================================================== */}

                <section className="relative hidden min-h-screen overflow-hidden lg:flex">

                    <div className="absolute inset-0 bg-[#07070a]" />

                    <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-600/[0.14] blur-[140px]" />

                    <div className="pointer-events-none absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.10] blur-[140px]" />

                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.045]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                            backgroundSize: "64px 64px",
                        }}
                    />

                    <div className="relative z-10 flex w-full flex-col px-10 py-9 xl:px-14 xl:py-10">

                        {/* Logo */}

                        <Link
                            to="/"
                            className="group flex w-fit cursor-pointer items-center gap-2.5"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20 transition duration-300 group-hover:shadow-violet-500/30">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>

                            <span className="text-[16px] font-semibold tracking-[-0.02em]">
                                ExplainThisAI
                            </span>
                        </Link>


                        {/* Main content */}

                        <div className="my-auto max-w-xl">

                            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
                                Document conversations
                            </p>

                            <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.055em] xl:text-6xl">

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

                            <p className="mt-7 max-w-lg text-[15px] leading-7 text-gray-400">
                                Upload your PDFs, ask questions about what
                                matters, and keep the conversation connected
                                to your documents.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-xs text-gray-500">

                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    Multiple documents
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    Follow-up questions
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    Conversation history
                                </div>

                            </div>

                        </div>


                        {/* Bottom */}

                        <p className="text-xs text-gray-600">
                            Understand more. Search less.
                        </p>

                    </div>
                </section>


                {/* =====================================================
                    RIGHT SIDE
                ===================================================== */}

                <section className="relative flex min-h-screen items-center bg-[#fafafa] px-5 py-8 text-gray-950 sm:px-8 lg:px-12 xl:px-16">

                    {/* Mobile glow */}

                    <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">

                        <div className="absolute left-1/2 top-[-180px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-[110px]" />

                    </div>


                    <div className="relative mx-auto w-full max-w-[410px]">

                        {/* Mobile header */}

                        <div className="mb-7 flex items-center justify-between lg:hidden">

                            <Link
                                to="/"
                                className="flex cursor-pointer items-center gap-2 text-[16px] font-semibold tracking-tight"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
                                    <Sparkles className="h-3.5 w-3.5 text-white" />
                                </div>

                                ExplainThisAI
                            </Link>

                            <Link
                                to="/login"
                                className="cursor-pointer text-sm font-medium text-gray-500 transition-colors hover:text-gray-950"
                            >
                                Login
                            </Link>

                        </div>


                        {/* =================================================
                            REGISTER
                        ================================================= */}

                        <div className="lg:translate-y-2">

                            {/* Header */}

                            <div>

                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">

                                    <User className="h-[17px] w-[17px]" />

                                </div>

                                <h2 className="text-[30px] font-semibold leading-tight tracking-[-0.035em] text-gray-950">
                                    Create your account
                                </h2>

                                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                                    Create an account to start working with
                                    your documents.
                                </p>

                            </div>


                            {/* Form */}

                            <form
                                onSubmit={handleSubmit}
                                className="mt-5 space-y-3.5"
                            >

                                {/* Name */}

                                <div>

                                    <label
                                        htmlFor="name"
                                        className="mb-1.5 block text-[13px] font-medium text-gray-800"
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
                                            className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />

                                    </div>

                                </div>


                                {/* Email */}

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block text-[13px] font-medium text-gray-800"
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
                                            className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />

                                    </div>

                                </div>


                                {/* Password */}

                                <div>

                                    <label
                                        htmlFor="password"
                                        className="mb-1.5 block text-[13px] font-medium text-gray-800"
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
                                            className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-12 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (previous) => !previous
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
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

                                </div>


                                {/* Submit */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group mt-1 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-950 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                                >

                                    {loading ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Create account

                                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                        </>
                                    )}

                                </button>

                            </form>


                            {/* Login */}

                            <p className="mt-5 text-center text-sm text-gray-500">

                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="cursor-pointer font-semibold text-gray-950 transition-colors hover:text-violet-600"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </section>

            </div>
        </main>
    );
};

export default Register;