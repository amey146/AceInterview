import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Loader2 } from "lucide-react";
import { fetchFinalReport, saveProgress } from "../utils/api";
import { useEffect, useState, useRef } from "react";

export default function InterviewReport() {
    const navigate = useNavigate();
    const location = useLocation();
    const responses = location.state?.responses || [];

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const hasGenerated = useRef(false);

    useEffect(() => {
        if (hasGenerated.current) return;
        hasGenerated.current = true;

        if (!responses || responses.length === 0) {
            navigate('/');
            return;
        }
        generateReport();
    }, [responses, navigate]);

    async function handleSave(score, feedback, role, level, username) {
        const result = await saveProgress({ username, score, feedback, role, level });
        if (!result) console.error("Failed to save progress to backend.");
        else console.log("Progress saved:", result);
        return result;
    }

    async function generateReport() {
        setLoading(true);
        const reportData = await fetchFinalReport(responses);
        setReport(reportData);
        const storedRole = responses[0]?.role || localStorage.getItem("selectedRole") || "Software Engineer";
        const storedLevel = responses[0]?.level || localStorage.getItem("selectedLevel") || "Entry-Level";

        await handleSave(
            reportData.average_score,
            reportData.overall_feedback,
            storedRole,
            storedLevel,
            responses[0]?.username || "asgprojects1464"
        );

        setLoading(false);
    }


    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--background)] text-[var(--foreground)]">
                    <Loader2 className="w-10 h-10 animate-spin mb-6 text-[var(--primary)]" />
                    <p className="text-lg font-medium">Generating your interview report...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!report || report.error) {
        return (
            <div className="flex min-h-screen items-center justify-center text-[var(--muted-foreground)] bg-[var(--background)] p-4 text-center">
                <div className="bg-[var(--card)] p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Failed to generate report</h2>
                    <p className="mb-6">{report?.raw || "No report data available."}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 rounded-[var(--radius-md)] bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-start bg-[var(--background)] text-[var(--foreground)] p-8 space-y-8">

                <div className="bg-[var(--card)] p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] max-w-3xl w-full flex flex-col items-center space-y-6">
                    <h1 className="text-4xl font-extrabold text-[var(--primary)]">Interview Report</h1>
                    <p className="text-[var(--muted-foreground)] text-center text-lg">{report.overall_feedback}</p>

                    <div className="w-full flex flex-col md:flex-row md:justify-between items-center gap-6">
                        <div className="flex flex-col items-center p-6 bg-[var(--background)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] w-full md:w-auto">
                            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Average Score</h2>
                            <p className="text-3xl font-bold text-[var(--primary)]">{report.average_score}/10</p>
                        </div>
                        <div className="flex-1 p-6 bg-[var(--background)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] w-full">
                            <h3 className="text-xl font-semibold mb-3">Improvement Tips</h3>
                            <ul className="list-disc list-inside space-y-1 text-[var(--muted-foreground)]">
                                {report.improvement_tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="px-10 py-4 rounded-[var(--radius-lg)] bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all"
                    >
                        Restart Interview
                    </button>
                </div>

            </div>
            <Footer />
        </>
    );
}
