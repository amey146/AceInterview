import {
    Lightbulb, Zap, BarChart2, Rocket
} from "lucide-react";

const features = [
    {
        title: "Role-based Questions",
        desc: "Tailored interview questions based on the specific role you're applying for, ensuring relevance and preparedness.",
        icon: <Lightbulb />,
    },
    {
        title: "Instant Feedback",
        desc: "Receive immediate feedback on your answers to help you improve and refine your responses.",
        icon: <Zap />,
    },
    {
        title: "Score & Tips",
        desc: "Get a score for your performance along with personalized tips to enhance your interview skills.",
        icon: <BarChart2 />,
    },
    {
        title: "No Setup Required",
        desc: "Start practicing right away without any complicated setup or installation.",
        icon: <Rocket />,
    },
];

export default function FeatureSection() {
    return (
        <section className="py-20 bg-[var(--accent)] text-[var(--accent-foreground)]">
            {/* Section Heading */}
            <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-12 drop-shadow-md text-[var(--primary)]">
                Features
            </h3>

            {/* Feature Cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="
              flex flex-col items-center text-center p-6 rounded-[var(--radius-lg)]
              bg-[var(--card)] text-[var(--card-foreground)]
              shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]
              transition-all duration-300
            "
                    >
                        {/* Icon */}
                        <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 text-[var(--primary)] bg-[var(--accent)] text-2xl">
                            {feature.icon}
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>

                        {/* Description */}
                        <p className="text-sm text-[var(--muted-foreground)] leading-snug">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
