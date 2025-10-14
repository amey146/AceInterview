export default function HeroSection() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-blue-200 via-blue-100 to-blue-200 text-white">
            <h2 className="text-4xl font-bold mb-4 text-blue-950">Ace Your Interview with Confidence</h2>
            <p className="text-gray-600 max-w-2xl mb-8"> Practice mock interviews for Frontend, Android, or ML roles.
                Get instant AI feedback on your answers — anytime, anywhere.</p>
            <a href="/practicerole" className="bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-500 px-6 py-3 rounded-lg font-medium">Start Practicing</a>
        </section>
    )
}