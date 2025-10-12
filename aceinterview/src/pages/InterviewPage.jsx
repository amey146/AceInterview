import { useEffect, useState } from "react";
import { getAIQuestion, getAIResponse } from "../utils/aiClient";
import QuestionBox from "../components/QuestionBox";

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
        const storedLevel = level || localStorage.getItem("selectedLevel") || "Junior";
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

        <div>
            <div>
                <div>
                    Question {currentIndex}/{TOTAL_QUESTIONS}
                </div>
                {loading && <div> Loading </div>}
                {!loading && !feedback && (
                    <>
                        <QuestionBox question={currentQuestion} />
                    </>
                )}
            </div>
        </div>
    );
}