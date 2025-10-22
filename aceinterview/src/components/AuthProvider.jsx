import React, { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email }
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        // token expired
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
        return;
      }

      // Optionally fetch fresh user profile from server:
      // api.get("/user/profile").then(res => setUser(res.data.user)).catch(...)

      setUser({
        id: decoded.id || decoded._id || null,
        // if you encoded more in token (like name/email), add here
      });
    } catch (e) {
      console.error("Invalid token:", e);
      localStorage.removeItem("token");
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUserFromToken();

    // Optional: listen to global logout (see api interceptor comment)
    const onLogout = () => {
      localStorage.removeItem("token");
      setUser(null);
    };
    window.addEventListener("logout", onLogout);
    return () => window.removeEventListener("logout", onLogout);
  }, [loadUserFromToken]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user: userFromServer } = res.data;
    if (token) {
      localStorage.setItem("token", token);
      // update user from token or server response
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id || userFromServer?.id,
          name: userFromServer?.name || decoded.name,
          email: userFromServer?.email || email,
        });
      } catch {
        setUser(userFromServer || null);
      }
    }
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // optional: inform others (tabs)
    window.dispatchEvent(new Event("logout"));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
