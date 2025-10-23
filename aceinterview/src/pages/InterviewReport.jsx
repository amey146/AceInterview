import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Loader2, CheckCircle2, RotateCw, Award } from "lucide-react";
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

        const token = localStorage.getItem("token");
        if (token) {
            await handleSave(
                reportData.average_score,
                reportData.overall_feedback,
                storedRole,
                storedLevel,
                responses[0]?.username || "Anonymous"
            );
        }
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

    {
        !localStorage.getItem("token") && (
            <p className="text-sm text-[var(--muted-foreground)] mt-4">
                <span className="text-[var(--primary)] font-medium">Note:</span> You’re using a guest session — login to save your progress permanently.
            </p>
        )
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
                {/* Header with celebration */}
                <div className="text-center space-y-3 pt-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--primary)]/10 rounded-full mb-4">
                        <CheckCircle2 className="w-10 h-10 text-[var(--primary)] hover:text-lime-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)]">Interview Complete!</h1>
                    <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">Great job completing the interview. Here's your detailed performance analysis.</p>
                </div>
                <div className="bg-[var(--card)] p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] max-w-3xl w-full flex flex-col items-center space-y-6">
                    <h1 className="text-4xl font-extrabold text-[var(--primary)]">Summary Report</h1>
                    <p className="text-[var(--muted-foreground)] text-center text-lg">{report.overall_feedback}</p>

                    <div className="w-full flex flex-col md:flex-row md:justify-between items-stretch gap-6">
                        <div className="flex justify-center items-center p-6 bg-[var(--background)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] w-full md:w-1/3">
                            <div className="flex flex-col items-center gap-2">
                                <Award className="w-10 h-10 text-[var(--primary)]" />
                                <h2 className="text-lg font-semibold text-[var(--foreground)]">Average Score</h2>
                                <p className="text-6xl font-bold text-[var(--primary)]">{report.average_score}/10</p>
                            </div>
                        </div>
                        <div className="flex-1 p-6 bg-[var(--background)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]">
                            <h3 className="text-xl font-semibold mb-3">Improvement Tips</h3>
                            <ul className="list-disc list-inside space-y-1 text-[var(--muted-foreground)]">
                                {report.improvement_tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </div>



                </div>
                {/* Action Button */}
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => navigate("/")}
                        className="group px-8 py-4 rounded-[var(--radius-lg)] bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
                    >
                        <RotateCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        Start New Interview
                    </button>
                </div>

            </div >
            <Footer />
        </>
    );
}
