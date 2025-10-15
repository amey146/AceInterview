import { useEffect, useState } from "react";
import { getAIQuestion, getFinalReport } from "../utils/aiClient";
import QuestionBox from "../components/QuestionBox";
import AnswerInput from "../components/AnswerInput";

export default function InterviewPage({ role, level }) {
    const TOTAL_QUESTIONS = 5;
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [responses, setResponses] = useState([]); // store all Q&A
    const [currentIndex, setCurrentIndex] = useState(1);
    const [showReport, setShowReport] = useState(false);
    const [report, setReport] = useState(null);

    // Fetch first question on load
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

        // Save this Q&A
        const newResponse = {
            question: currentQuestion,
            answer: userAnswer,
        };

        const updatedResponses = responses.concat(newResponse);
        setResponses(updatedResponses);
        setUserAnswer("");

        // Check if last question
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
            <div className="flex min-h-screen items-center justify-center text-gray-300 bg-gray-900">
                {currentIndex > TOTAL_QUESTIONS ? "Generating your report..." : "Loading..."}
            </div>
        );
    }

    // Show report at the end
    if (showReport) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900 p-10">
                <h1 className="text-3xl font-bold text-green-400 mb-6">Interview Report</h1>
                <p className="text-gray-300 mb-4">{report.overall_feedback}</p>
                <h2 className="text-xl mb-2">Average Score: {report.average_score}/10</h2>
                <ul className="text-left">
                    {report.improvement_tips.map((tip, i) => (
                        <li key={i} className="text-gray-400">• {tip}</li>
                    ))}
                </ul>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
                >
                    Restart Interview
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="text-sm text-gray-400 text-right">
                    Question {currentIndex}/{TOTAL_QUESTIONS}
                </div>

                {loading && <div>Loading...</div>}

                {!loading && (
                    <>
                        <QuestionBox question={currentQuestion} />
                        <AnswerInput value={userAnswer} onChange={setUserAnswer} />
                        <button
                            onClick={handleNext}
                            className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all text-white p-4 rounded-xl text-lg font-semibold"
                        >
                            {currentIndex < TOTAL_QUESTIONS ? "Next Question" : "Submit All"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
