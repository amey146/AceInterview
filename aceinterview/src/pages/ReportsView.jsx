import { use, useState } from "react";
import {
    Edit3,
    Trash2,
    Sparkles,
    Calendar,
    FileText,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getReports } from "../utils/api";
import { getAISummarization } from "../utils/api";
import { useNavigate } from "react-router-dom";

const mockReports = [

];

export default function ReportsPage() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reports, setReports] = useState(mockReports);
    const navigate = useNavigate();


    async function handleFetchReports() {
        try {
            const userId = localStorage.getItem("userId");
            if (fromDate && toDate) {
                // Fetch reports from API based on date range
                const fetchedReports = await getReports(fromDate, toDate, userId);
                setReports(fetchedReports || []);
            }
            console.log("I'm inside ReportsView.jsx");
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    async function handleSummarize() {
        if (reports.length === 0) return;
        const summary = reports.map(r => r.feedback).join(" ");
        try {
            const response = await getAISummarization(summary);
            console.log("AI Summary:", response);
            navigate('/reportsdashboard', { state: { data: response, fromDate, toDate } });
        } catch (error) {
            console.error("Error fetching AI summary:", error);
        }
    }

    return (
        <>

            <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-[var(--primary)] mb-2 drop-shadow-md">
                            User Reports
                        </h1>
                        <p className="text-[var(--muted-foreground)]">View and manage feedback reports for candidates</p>
                    </div>

                    {/* Filters Card */}
                    <div className="bg-[var(--card)] rounded-[var(--radius)] shadow-[var(--shadow-md)] border border-[var(--border)] p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="text-[var(--primary)]" size={20} />
                            <h2 className="text-lg font-semibold">Date Range Filter</h2>
                        </div>

                        <div className="flex flex-wrap gap-4 items-end">
                            <div className="flex-1 min-w-[200px]">
                                <label htmlFor="fromDate" className="block mb-2 text-sm font-medium">
                                    From Date
                                </label>
                                <input
                                    type="date"
                                    id="fromDate"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full p-2.5 border border-[var(--border)] rounded-[var(--radius)] bg-[var(--background)] outline-none transition"
                                />
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <label htmlFor="toDate" className="block mb-2 text-sm font-medium">
                                    To Date
                                </label>
                                <input
                                    type="date"
                                    id="toDate"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full p-2.5 border border-[var(--border)] rounded-[var(--radius)] bg-[var(--background)] outline-none transition"
                                />
                            </div>
                            <button
                                onClick={handleFetchReports}
                                className="px-6 py-2.5 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-[var(--radius)] hover:shadow-[var(--shadow-lg)] transition font-medium shadow-[var(--shadow-sm)] cursor-pointer"
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>

                    {/* User Info & Summarize Section */}
                    <div className="bg-[var(--card)] rounded-[var(--radius)] shadow-[var(--shadow-md)] border border-[var(--border)] p-6 mb-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-1">
                                    Reports: <span className="text-[var(--accent)]"></span>
                                </h2>
                                <p className="text-[var(--muted-foreground)] text-sm">{reports.length} report{reports.length !== 1 ? 's' : ''} found</p>
                            </div>
                            <button
                                onClick={handleSummarize}
                                className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)] hover:shadow-[var(--shadow-lg)] transition font-semibold shadow-[var(--shadow-md)] flex items-center gap-2 cursor-pointer"
                            >
                                <Sparkles size={18} fill="#FFD700" stroke="#000" />
                                Summarize Reports
                            </button>
                        </div>
                    </div>

                    {/* Reports List */}
                    <div className="space-y-4">
                        {reports.map((report) => (
                            <div
                                key={report._id}
                                className="bg-[var(--card)] rounded-[var(--radius)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all p-6 border border-[var(--border)]"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <FileText size={18} className="text-[var(--primary)]" />
                                            <span className="text-sm font-medium text-[var(--muted-foreground)]">
                                                {new Date(report.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="leading-relaxed">{report.feedback}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:shadow-[var(--shadow-sm)] transition shadow-[var(--shadow-xs)]"
                                            title="Delete report"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State (shown when no reports) */}
                    {reports.length === 0 && (
                        <div className="bg-[var(--card)] rounded-[var(--radius)] shadow-[var(--shadow-md)] border border-[var(--border)] p-12 text-center">
                            <FileText size={48} className="text-[var(--muted-foreground)] mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-semibold mb-2">No Reports Found</h3>
                            <p className="text-[var(--muted-foreground)]">Try adjusting your date range filter</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}