// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../utils/hooks";
import { Loader2 } from "lucide-react";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        setLoading(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (error) {
            setErr(error.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
            <div className="w-full max-w-md bg-[var(--card)]/90 border border-[var(--border)] backdrop-blur-sm shadow-[var(--shadow-md)] rounded-2xl p-8">
                <h2 className="text-3xl font-extrabold text-center text-[var(--primary)] mb-6">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-[var(--muted-foreground)] mb-8">
                    Login to continue your interview practice
                </p>

                {err && (
                    <div className="mb-4 text-red-500 text-sm text-center font-medium">
                        {err}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
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
                            hover:bg-[var(--primary-hover)]
                            flex items-center justify-center
                            transition-all duration-300 disabled:opacity-70
                        "
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <p className="text-sm text-center mt-6 text-[var(--muted-foreground)]">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-[var(--primary)] font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
