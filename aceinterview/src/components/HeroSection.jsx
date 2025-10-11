export default function HeroSection() {
    return(
        <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-cyan-900 to-cyan-800 text-white">
            <h2 className="text-4xl font-bold mb-4">Ace Your Interview with Confidence</h2>
            <p className="text-gray-300 max-w-2xl mb-8"> Practice mock interviews for Frontend, Android, or ML roles. 
        Get instant AI feedback on your answers — anytime, anywhere.</p>
        <a href="/practice" className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-medium">Start Practicing</a>
        </section>
    )
}