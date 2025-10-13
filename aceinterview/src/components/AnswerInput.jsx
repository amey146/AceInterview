export default function AnswerInput({ value, onChange }) {
    return (
        <textarea name="ans" id="ans" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Type your answer here..." className="w-full h-40 p-4 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"></textarea>
    );
}