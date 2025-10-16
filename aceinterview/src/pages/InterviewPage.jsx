import { useEffect, useState } from "react";
import { getAIQuestion, getFinalReport } from "../utils/aiClient";
import QuestionBox from "../components/QuestionBox";
import AnswerInput from "../components/AnswerInput";

export default function InterviewPage({ role, level }) {
    const TOTAL_QUESTIONS = 5;
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [responses, setResponses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [showReport, setShowReport] = useState(false);
    const [report, setReport] = useState(null);

    useEffect(() => {
        fetchQuestion();
    }, []);

    async function fetchQuestion() {
        setLoading(true);
        const storedRole = role || localStorage.getItem("selectedRole") || "Software Engineer";
        const storedLevel = level || localStorage.getItem("selectedLevel") || "Entry-Level";

        const question = await getAIQuestion(storedRole, storedLevel);
        setCurrentQuestion(question);
        setLoading(false);
    }

    async function handleNext() {
        if (!userAnswer.trim()) return;

        const newResponse = { question: currentQuestion, answer: userAnswer };
        const updatedResponses = responses.concat(newResponse);
        setResponses(updatedResponses);
        setUserAnswer("");

        if (currentIndex < TOTAL_QUESTIONS) {
            setCurrentIndex(currentIndex + 1);
            fetchQuestion();
        } else {
            await generateFinalReport(updatedResponses);
        }
    }

    async function generateFinalReport(allResponses) {
        setLoading(true);
        const reportData = await getFinalReport(allResponses);
        setReport(reportData);
        setShowReport(true);
        setLoading(false);
    }

    if (loading && !showReport) {
        return (
            <div className="flex min-h-screen items-center justify-center text-[var(--muted-foreground)] bg-[var(--background)]">
                {currentIndex > TOTAL_QUESTIONS ? "Generating your report..." : "Loading..."}
            </div>
        );
    }

    if (showReport) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-8">
                <h1 className="text-4xl font-bold text-[var(--primary)] mb-6">Interview Report</h1>
                <p className="text-[var(--muted-foreground)] mb-6 text-center max-w-2xl">{report.overall_feedback}</p>
                <h2 className="text-2xl font-semibold mb-4">Average Score: {report.average_score}/10</h2>
                <ul className="text-left mb-6 max-w-2xl">
                    {report.improvement_tips.map((tip, i) => (
                        <li key={i} className="text-[var(--muted-foreground)] mb-1">• {tip}</li>
                    ))}
                </ul>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 rounded-[var(--radius-lg)] bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all"
                >
                    Restart Interview
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--background)] text-[var(--foreground)]">
            <div className="w-full max-w-2xl bg-[var(--card)] rounded-[var(--radius-lg)] shadow-[var(--shadow-2xl)] p-8 space-y-6">
                {/* Question counter */}
                <div className="text-sm text-[var(--muted-foreground)] text-right">
                    Question {currentIndex}/{TOTAL_QUESTIONS}
                </div>

                {/* Question */}
                {!loading && <QuestionBox question={currentQuestion} />}
                {loading && <div className="text-[var(--muted-foreground)] text-center">Loading...</div>}

                {/* Answer input */}
                <AnswerInput value={userAnswer} onChange={setUserAnswer} />

                {/* Next / Submit button */}
                <button
                    onClick={handleNext}
                    className="w-full px-6 py-4 rounded-[var(--radius-lg)] bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all text-lg"
                >
                    {currentIndex < TOTAL_QUESTIONS ? "Next Question" : "Submit All"}
                </button>
            </div>
        </div>
    );
}
