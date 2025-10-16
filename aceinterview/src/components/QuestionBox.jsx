export default function QuestionBox({ question }) {
    return (
        <div
            className="
        p-6 rounded-[var(--radius-lg)] text-lg font-semibold
        bg-[var(--card)] text-[var(--card-foreground)]
        shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]
        transition-all duration-300
      "
        >
            {question || (
                <span className="text-[var(--muted-foreground)]">
                    Fetching question...
                </span>
            )}
        </div>
    );
}
