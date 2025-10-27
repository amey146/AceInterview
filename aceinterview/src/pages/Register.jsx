// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../utils/hooks";
import { Loader2 } from "lucide-react";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        setLoading(true);
        try {
            await register(name, email, password);
            navigate("/login");
        } catch (error) {
            setErr(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
            <div className="w-full max-w-md bg-[var(--card)]/90 border border-[var(--border)] backdrop-blur-sm shadow-[var(--shadow-md)] rounded-2xl p-8">
                <h2 className="text-3xl font-extrabold text-center text-[var(--primary)] mb-6">
                    Create an Account 🚀
                </h2>
                <p className="text-center text-[var(--muted-foreground)] mb-8">
                    Join AceInterview and start practicing smarter
                </p>

                {err && (
                    <div className="mb-4 text-red-500 text-sm text-center font-medium">
                        {err}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="John Doe"
                            className="
                                w-full px-4 py-2.5 rounded-lg border border-[var(--border)]
                                bg-[var(--card)] text-[var(--foreground)]
                                focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
                                transition-all duration-300
                            "
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="
                                w-full px-4 py-2.5 rounded-lg border border-[var(--border)]
                                bg-[var(--card)] text-[var(--foreground)]
                                focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
                                transition-all duration-300
                            "
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="
                                w-full px-4 py-2.5 rounded-lg border border-[var(--border)]
                                bg-[var(--card)] text-[var(--foreground)]
                                focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
                                transition-all duration-300
                            "
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full py-2.5 rounded-lg font-semibold 
                            bg-[var(--primary)] text-white 
                            hover:bg-[var(--accent)]
                            flex items-center justify-center
                            transition-all duration-300 disabled:opacity-70 cursor-pointer
                        "
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Registering...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>

                <p className="text-sm text-center mt-6 text-[var(--muted-foreground)]">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[var(--primary)] font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
