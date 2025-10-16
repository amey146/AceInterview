const steps = [
    {
        step: "1",
        title: "Select Role",
        description:
            "Choose the role you want to prepare for. e.g., Software Engineer, Data Scientist, Product Manager.",
    },
    {
        step: "2",
        title: "Answer Questions",
        description:
            "Respond to a series of questions to help us understand your current skills and experience.",
    },
    {
        step: "3",
        title: "Get Feedback",
        description:
            "Receive personalized learning paths and resources tailored to your selected role and answers.",
    },
];

export default function StepsSection() {
    return (
        <section className="py-20 bg-[var(--background)] text-[var(--foreground)]">
            {/* Section Heading */}
            <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-14 drop-shadow-md text-[var(--primary)]">
                How It Works
            </h3>

            {/* Steps Container */}
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">
                {steps.map((s, i) => (
                    <div
                        key={i}
                        className="
              flex flex-col items-center text-center flex-1 p-8
              rounded-[var(--radius-lg)]
              bg-[var(--card)] text-[var(--card-foreground)]
              shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]
              transition-all duration-300
            "
                    >
                        {/* Step Number */}
                        <div
                            className="
                w-12 h-12 flex items-center justify-center rounded-full
                mb-4 text-xl font-bold text-[var(--primary-foreground)]
                bg-[var(--primary)]
              "
                        >
                            {s.step}
                        </div>

                        {/* Step Title */}
                        <h4 className="text-xl font-semibold mb-2">{s.title}</h4>

                        {/* Step Description */}
                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                            {s.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
