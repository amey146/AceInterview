export default function QuestionBox({ question }) {
    return (
        <div className="p-4 bg-gray-700 rounded-xl text-lg font-semibold">
            {question || "Fetching question..."}
        </div>
    );
}