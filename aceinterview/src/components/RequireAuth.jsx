import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../utils/hooks";

export default function RequireAuth({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        // redirect to login, preserve return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
