import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../utils/hooks";

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
            // after register, you can redirect to login or auto-login:
            navigate("/login");
        } catch (error) {
            setErr(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {err && <div style={{ color: "red" }}>{err}</div>}
            <form onSubmit={onSubmit}>
                <div><label>Name</label><input value={name} onChange={e => setName(e.target.value)} required /></div>
                <div><label>Email</label><input value={email} onChange={e => setEmail(e.target.value)} type="email" required /></div>
                <div><label>Password</label><input value={password} onChange={e => setPassword(e.target.value)} type="password" required /></div>
                <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}
