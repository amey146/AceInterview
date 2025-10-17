export default function HeroSection() {
    return (
        <section
            className="
        flex flex-col items-center justify-center text-center py-24 px-6
        bg-[var(--background)] text-[var(--foreground)]
      "
        >
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-md text-[var(--primary)] leading-tight">
                Ace Your Interview with Confidence
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-3xl mb-10 leading-relaxed">
                Practice mock interviews for Frontend, Mobile, or ML roles.
                Get instant AI feedback on your answers - anytime, anywhere.
            </p>

            {/* CTA Button */}
            <a
                href="/practicerole"
                className="
          px-8 py-4 rounded-[var(--radius-lg)] 
          bg-[var(--primary)] text-[var(--primary-foreground)]
          shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]
          hover:scale-105 transition-all duration-300 font-bold
        "
            >
                Start Practicing
            </a>
        </section>
    );
}
