import { useEffect, useState } from "react";
import {
    Calendar,
    Award,
    Tag,
    TrendingUp,
    Download,
    ArrowLeft,
    Star,
    ScrollText,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashboardPage({ onBack }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { data, fromDate, toDate } = location.state || {};

    const [loading, setLoading] = useState(true);
    const [invalidData, setInvalidData] = useState(false);

    const handleBack = onBack || (() => navigate("/reports"));

    // Fallback: check for missing/corrupt data
    useEffect(() => {
        if (!data || typeof data !== "object" || !data.overall_summary) {
            setInvalidData(true);
            setLoading(true);

            const timer = setTimeout(() => {
                navigate("/reportsview"); // redirect after 10s
            }, 10000);

            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [data, navigate]);

    // Star rendering (0–10 → 0–5 scale)
    const renderStars = (rating) => {
        if (rating == null) return null;

        const starRating = Math.min(Math.max(rating / 2, 0), 5);
        const stars = [];
        const fullStars = Math.floor(starRating);
        const hasHalfStar = starRating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star
                        key={i}
                        size={24}
                        fill="currentColor"
                        className="text-[var(--primary)]"
                    />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <Star
                        key={i}
                        size={24}
                        fill="currentColor"
                        className="text-[var(--primary)] opacity-50"
                    />
                );
            } else {
                stars.push(
                    <Star
                        key={i}
                        size={24}
                        className="text-[var(--muted-foreground)] opacity-30"
                    />
                );
            }
        }

        return <div className="flex gap-1">{stars}</div>;
    };

    // Loader / fallback UI
    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
                    <p className="text-xl text-[var(--muted-foreground)] mb-4 text-center">
                        {invalidData
                            ? "Data is missing or corrupt. Redirecting to Reports page..."
                            : "Loading summary..."}
                    </p>
                    <div className="loader border-[var(--accent)] border-t-[var(--primary)] border-4 rounded-full w-12 h-12 animate-spin"></div>
                </div>
                <Footer />
            </>
        );
    }

    // Main Dashboard JSX
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-[var(--primary)] mb-2 drop-shadow-md">
                            Summary Dashboard
                        </h1>
                        <p className="text-[var(--muted-foreground)]">
                            Comprehensive analysis of interview performance
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Date Range */}
                        <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
                shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar size={20} className="text-[var(--primary)]" />
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                                    Date Range
                                </h2>
                            </div>
                            <p className="text-2xl font-bold">{fromDate || "N/A"}</p>
                            <p className="text-lg text-[var(--muted-foreground)]">to {toDate || "N/A"}</p>
                        </div>

                        {/* Level */}
                        <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
                shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                            <div className="flex items-center gap-2 mb-3">
                                <Award size={20} className="text-[var(--primary)]" />
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                                    AI Assessment
                                </h2>
                            </div>
                            <p className="text-2xl font-bold text-[var(--primary)]">
                                {data?.overall_level || "N/A"}
                            </p>
                            <p className="text-sm text-[var(--muted-foreground)] mt-1">
                                Based on performance analysis
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
                shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp size={20} className="text-[var(--primary)]" />
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                                    Overall Rating
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold text-[var(--primary)]">
                                    {data?.overall_score / 2 ?? "N/A"}
                                </span>
                                <span className="text-lg text-[var(--muted-foreground)]">/ 5.0</span>
                            </div>
                            <div className="mt-2">{renderStars(data?.overall_score)}</div>
                        </div>
                    </div>

                    {/* Top Keywords */}
                    <div className="mb-6 p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
              shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag size={20} className="text-[var(--primary)]" />
                            <h2 className="text-xl font-semibold">Top Keywords</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data?.top_strengths?.length > 0 ? (
                                data.top_strengths.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-[var(--radius)] bg-[var(--accent)] text-[var(--accent-foreground)]
                    shadow-[var(--shadow-xs)] text-sm font-medium"
                                    >
                                        {keyword}
                                    </span>
                                ))
                            ) : (
                                <span className="text-[var(--muted-foreground)]">No strengths available</span>
                            )}
                        </div>
                    </div>

                    {/* Overall Summary */}
                    <div className="mb-6 p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
              shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                        <div className="flex items-center gap-2 mb-4">
                            <ScrollText size={20} className="text-[var(--primary)]" />
                            <h2 className="text-xl font-semibold">Overall Summary</h2>
                        </div>
                        <p className="text-[var(--foreground)] leading-relaxed text-base">
                            {data?.overall_summary || "No summary available."}
                        </p>
                    </div>

                    {/* Improvement Tips */}
                    <div className="mb-8 p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
              shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp size={20} className="text-[var(--primary)]" />
                            <h2 className="text-xl font-semibold">Improvement Tips</h2>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-[var(--foreground)]">
                            {data?.improvement_tips?.length > 0 ? (
                                data.improvement_tips.map((tip, idx) => (
                                    <li key={idx} className="text-base leading-relaxed">
                                        {tip}
                                    </li>
                                ))
                            ) : (
                                <li className="text-base leading-relaxed">
                                    No specific improvement tips provided.
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={handleBack}
                            className="px-6 py-3 rounded-[var(--radius)] bg-[var(--secondary)] text-[var(--secondary-foreground)]
                  shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition font-medium flex items-center gap-2"
                        >
                            <ArrowLeft size={18} /> Back to Reports
                        </button>
                        <button
                            className="px-6 py-3 rounded-[var(--radius)] bg-[var(--accent)] text-[var(--accent-foreground)]
                  shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition font-medium flex items-center gap-2"
                        >
                            <Download size={18} /> Export Summary
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
