export default function AnswerInput({ value, onChange }) {
    return (
        <textarea
            name="ans"
            id="ans"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer here..."
            className="
        w-full h-40 p-4 rounded-[var(--radius-lg)] 
        bg-[var(--card)] text-[var(--card-foreground)]
        shadow-[var(--shadow-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]
        resize-none transition-all duration-200
      "
        />
    );
}
