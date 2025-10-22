// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../utils/hooks";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

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
            setErr(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {err && <div style={{ color: "red" }}>{err}</div>}
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
                </div>
                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}
