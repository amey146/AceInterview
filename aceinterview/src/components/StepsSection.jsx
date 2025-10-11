const steps = [
    {
        step: "1", title: "Select Role", description: "Choose the role you want to prepare for. e.g., Software Engineer, Data Scientist, Product Manager."
    }
    , {
        step: "2", title: "Answer Questions", description: "Respond to a series of questions to help us understand your current skills and experience."
    }, {
        step: "3", title: "Get Feedback", description: "Receive personalized learning paths and resources tailored to your selected role and answers."
    }
]
export default function StepsSection() {
    return (
        <section className="py-16 bg-gray-900 text-white">
            <h3 className="text-3xl font-bold text-center mb-10">How It Works</h3>
            <div className="flex flex-col md:flex-col justify-center gap-8 max-w-5xl mx-auto">{steps.map((s, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-6 text-center flex-1">
                    <div className="text-blue-400 text-2xl font-bold mb-2">{s.step}</div>
                    <h4 className="text-xl font-semibold mb-2">Step {s.title}</h4>
                    <p className="text-gray-400">{s.description}</p>
                </div>
            ))}</div>
        </section>
    )
}