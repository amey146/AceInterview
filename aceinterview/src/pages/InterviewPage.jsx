import { useEffect, useState } from "react";
import QuestionBox from "../components/QuestionBox";
import AnswerInput from "../components/AnswerInput";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { fetchAIQuestion } from "../utils/api";

export default function InterviewPage({ role, level }) {
    const TOTAL_QUESTIONS = Number(localStorage.getItem("numQuestions")) || 5;
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [responses, setResponses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllQuestions();
    }, []);

    async function fetchAllQuestions() {
        setLoading(true);
        const storedRole = localStorage.getItem("selectedRole") || "Software Engineer";
        const storedLevel = localStorage.getItem("selectedLevel") || "Entry-Level";
        const numQuestions = Number(localStorage.getItem("numQuestions")) || 5;


        //fetch all at once
        const questions = await fetchAIQuestion(storedRole, storedLevel, numQuestions);
        setQuestions(questions);
        setCurrentQuestion(questions[0]);
        setLoading(false);
    }

    function handleNext() {
        if (!userAnswer.trim()) return;

        const newResponse = { question: currentQuestion, answer: userAnswer };
        const updatedResponses = [...responses, newResponse];
        setResponses(updatedResponses);
        setUserAnswer("");

        if (currentIndex < TOTAL_QUESTIONS) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentQuestion(questions[nextIndex - 1]);
        } else {
            // Pass responses via router state
            navigate('/report', { state: { responses: updatedResponses } });
        }
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--background)] text-[var(--foreground)]">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                    <p>Loading...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <div className="px-4 pt-4 bg-[var(--background)] text-[var(--foreground)] flex items-center">
                <div
                    className="px-4 py-2 rounded-[var(--radius)] bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="w-4 h-4 inline-block mr-1" /> Exit
                </div>
            </div>
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--background)] text-[var(--foreground)]">
                <div className="w-full max-w-2xl bg-[var(--card)] rounded-[var(--radius-lg)] shadow-[var(--shadow-2xl)] p-8 space-y-6">
                    <div className="text-sm text-[var(--muted-foreground)] text-right">
                        Question {currentIndex}/{TOTAL_QUESTIONS}
                    </div>

                    <QuestionBox question={currentQuestion} />
                    <AnswerInput value={userAnswer} onChange={setUserAnswer} />

                    <button
                        onClick={handleNext}
                        className="w-full px-6 py-4 rounded-[var(--radius-lg)] bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all text-lg cursor-pointer"
                    >
                        {currentIndex < TOTAL_QUESTIONS ? "Next Question" : "Submit All"}
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
