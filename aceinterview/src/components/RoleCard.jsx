export default function RoleCard({ role, isSelected, onSelect }) {
    const Icon = role.icon; // Lucide icon component

    return (
        <div
            onClick={onSelect}
            className={`group relative cursor-pointer rounded-[var(--radius-lg)] p-6 transition-all duration-300 
        border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]
        shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1
        active:scale-[0.98]
        ${isSelected ? "ring-2 ring-[var(--primary)]" : ""}
      `}
            style={{
                boxShadow:
                    "var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-spread) var(--shadow-color)",
            }}
        >
            <div className="flex flex-col items-center text-center space-y-3">
                {/* Icon */}
                <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full transition-colors duration-300
            ${isSelected ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "bg-[var(--accent)] text-[var(--primary)]"}
          `}
                >
                    <Icon className="w-8 h-8" strokeWidth={2} />
                </div>

                {/* Title */}
                <h2
                    className={`text-lg font-semibold tracking-tight transition-colors duration-300 
            ${isSelected ? "text-[var(--primary)]" : "text-[var(--foreground)]"}
          `}
                >
                    {role.name}
                </h2>

                {/* Description */}
                <p className="text-sm text-[var(--muted-foreground)] leading-snug">
                    {role.description}
                </p>
            </div>
        </div>
    );
}
