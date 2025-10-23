import axios from "axios";

const API_BASE = "http://localhost:5000/api";

async function apiRequest(endpoint, method = "GET", body = null) {
    try {
        const token = localStorage.getItem("token"); // <-- Get token

        const res = await fetch(`${API_BASE}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }), // include if available
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`Error with ${endpoint}:`, err);
        return null;
    }
}


export async function saveProgress(data) {
    return apiRequest("/progress/save", "POST", data);
}

export async function getLeaderboard() {
    return apiRequest("/progress/leaderboard");
}

export async function fetchAIQuestion(role, level, quantity) {
    const data = await apiRequest("/ai/question", "POST", { role, level, quantity });
    return data?.questions || "Error generating question";
}

export async function fetchFinalReport(responses) {
    return apiRequest("/ai/report", "POST", { responses });
}

export async function isProfessionalEngineer(role) {
    const data = await apiRequest("/ai/validateRole", "POST", { role });
    return data ? data.isValid : false;
}

export async function getAISummarization(text) {
    const data = await apiRequest("/ai/summarize", "POST", { text });
    return data?.summary || "Error generating summary";
}

export async function getReports(fromDate, toDate, username) {
    // console.log("I'm inside api.js");
    const data = await apiRequest("/log/reports?from=" + fromDate + "&to=" + toDate + "&username=" + username);
    console.log("Fetched reports:", data);
    return data || [];
}

export async function registerUser(data) {
    const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function loginUser(data) {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function getUserProfile() {
    return apiRequest("/user/profile");
}

export async function updateUserProfile(body) {
    return apiRequest("/user/update", "PUT", body);
}



// AXIOS INSTANCE WITH INTERCEPTORS


const api = axios.create({
    baseURL: API_BASE,
    // withCredentials: true, // enable if you store JWT in an httpOnly cookie
});

// Request interceptor: attach token if present (from localStorage)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Response interceptor: optionally handle 401 globally
api.interceptors.response.use(
    res => res,
    (error) => {
        const { response } = error;
        if (response && response.status === 401) {
            // Optionally: broadcast logout event or redirect to login
            // window.dispatchEvent(new Event("logout"));
        }
        return Promise.reject(error);
    }
);

export default api;
