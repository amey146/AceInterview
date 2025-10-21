const API_BASE = "http://localhost:5000/api";

async function apiRequest(endpoint, method = "GET", body = null) {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method,
            headers: { "Content-Type": "application/json" },
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

