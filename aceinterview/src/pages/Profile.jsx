import React, { useEffect, useState } from "react";
import api from "../utils/api";
import useAuth from "../utils/hooks";

export default function Profile() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        let mounted = true;
        api.get("/user/profile")
            .then(res => {
                if (mounted) setProfile(res.data);
            })
            .catch(err => {
                // if 401 or 403, you might want to logout
                if (err.response?.status === 401) {
                    logout();
                }
            });
        return () => (mounted = false);
    }, [logout]);

    return (
        <div>
            <h2>Profile</h2>
            <div>User from token: {JSON.stringify(user)}</div>
            <div>Profile from server: {profile ? JSON.stringify(profile) : "Loading..."}</div>
        </div>
    );
}
