import { useState } from "react";
import { Calendar, Award, Tag, TrendingUp, Download, ArrowLeft, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Realistic mock data for demo
const mockSummary = {
    fromDate: "17-10-2025",
    toDate: "18-10-2025",
    level: "Junior Developer",
    keywords: ["React", "Node.js", "SQL", "Problem-Solving", "UI/UX", "Debugging"],
    rating: 4.0, // out of 5
    feedback: "The candidate has consistently performed well in mock interviews. Strong skills in React and API integration are evident. Feedback indicates good problem-solving and debugging abilities, with some improvement needed in advanced SQL queries and UI optimization. Overall performance is above average and shows readiness for entry-level software development roles."
};

export default function DashboardPage({ onBack }) {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} size={24} fill="currentColor" className="text-[var(--accent)]" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<Star key={i} size={24} fill="currentColor" className="text-[var(--accent)] opacity-50" />);
            } else {
                stars.push(<Star key={i} size={24} className="text-[var(--muted-foreground)] opacity-30" />);
            }
        }

        return <div className="flex gap-1">{stars}</div>;
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-[var(--primary)] mb-2 drop-shadow-md">
                            Summary Dashboard
                        </h1>
                        <p className="text-[var(--muted-foreground)]">Comprehensive analysis of interview performance</p>
                    </div>

                    {/* Summary Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Date Range Card */}
                        <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
                            shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar size={20} className="text-[var(--primary)]" />
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Date Range</h2>
                            </div>
                            <p className="text-2xl font-bold">{mockSummary.fromDate}</p>
                            <p className="text-lg text-[var(--muted-foreground)]">to {mockSummary.toDate}</p>
                        </div>

                        {/* Level Card */}
                        <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
                            shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                            <div className="flex items-center gap-2 mb-3">
                                <Award size={20} className="text-[var(--primary)]" />
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">AI Assessment</h2>
                            </div>
                            <p className="text-2xl font-bold text-[var(--primary)]">{mockSummary.level}</p>
                            <p className="text-sm text-[var(--muted-foreground)] mt-1">Based on performance analysis</p>
                        </div>

                        {/* Rating Card */}
                        <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
                            shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp size={20} className="text-[var(--primary)]" />
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Overall Rating</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold text-[var(--accent)]">{mockSummary.rating}</span>
                                <span className="text-lg text-[var(--muted-foreground)]">/ 5.0</span>
                            </div>
                            <div className="mt-2">
                                {renderStars(mockSummary.rating)}
                            </div>
                        </div>
                    </div>

                    {/* Keywords Section */}
                    <div className="mb-6 p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
                        shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag size={20} className="text-[var(--primary)]" />
                            <h2 className="text-xl font-semibold">Top Keywords</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {mockSummary.keywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-[var(--radius)] bg-[var(--accent)] text-[var(--accent-foreground)]
                                        shadow-[var(--shadow-xs)] text-sm font-medium"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="mb-6 p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)]
                        shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition">
                        <h2 className="text-xl font-semibold mb-4 text-[var(--primary)]">Detailed Feedback</h2>
                        <div className="space-y-4">
                            <p className="text-[var(--foreground)] leading-relaxed text-base">
                                {mockSummary.feedback}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={onBack}
                            className="px-6 py-3 rounded-[var(--radius)] bg-[var(--secondary)] text-[var(--secondary-foreground)]
                                shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition font-medium flex items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            Back to Reports
                        </button>
                        <button
                            className="px-6 py-3 rounded-[var(--radius)] bg-[var(--accent)] text-[var(--accent-foreground)]
                                shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition font-medium flex items-center gap-2"
                        >
                            <Download size={18} />
                            Export Summary
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}