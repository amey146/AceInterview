import { useEffect, useState } from "react";
import { getAIQuestion, getAIResponse } from "../utils/aiClient";
import QuestionBox from "../components/QuestionBox";
import AnswerInput from "../components/AnswerInput";

export default function InterviewPage({ role, level }) {
    const TOTAL_QUESTIONS = 5;
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(1);

    useEffect(() => {
        fetchQuestions();
    }, []);

    async function fetchQuestions() {
        setLoading(true);
        // Fetch role and level from localStorage if not passed as props
        const storedRole = role || localStorage.getItem("selectedRole") || "Software Engineer";
        const storedLevel = level || localStorage.getItem("selectedLevel") || "Entry-Level";
        const question = getAIQuestion(storedRole, storedLevel);
        setCurrentQuestion(question);
        setLoading(false);
    }

    async function handleSubmit() {
        if (!userAnswer.trim()) return;
        setLoading(true);
        const res = await getAIResponse(currentQuestion, userAnswer);
        setFeedback(res);
        setLoading(false);
    }

    // function handleNext() {

    // }

    return (

        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="text-sm text-gray-400 text-right">
                    Question {currentIndex}/{TOTAL_QUESTIONS}
                </div>
                {loading && <div> Loading </div>}
                {!loading && !feedback && (
                    <>
                        <QuestionBox question={currentQuestion} />
                        <AnswerInput value={userAnswer} onChange={setUserAnswer} />
                        <button onClick={handleSubmit} className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all text-white p-4 rounded-xl text-lg font-semibold">Submit</button>
                    </>
                )}
            </div>
        </div>
    );
}