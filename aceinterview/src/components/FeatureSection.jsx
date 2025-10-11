const features =[
    {
        title: "Role-based Questions", desc: "Tailored interview questions based on the specific role you're applying for, ensuring relevance and preparedness."
    },{
        title: "Instant Feedback", desc: "Receive immediate feedback on your answers to help you improve and refine your responses."
    },
    {
        title: "Score & Tips", desc: "Get a score for your performance along with personalized tips to enhance your interview skills."
    },
    {
        title: "No Setup Required", desc: "Start practicing right away without any complicated setup or installation."
    }
]
export default function FeatureSection() {
    return(
<section className="py-16 bg-gray-100 text-gray-900">    
   <h3 className="text-3xl font-bold text-center mb-10">Features</h3>
   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">{features.map((feature, index) => (
       <div key={index} className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
           <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
           <p className="text-gray-600">{feature.desc}</p>
       </div>
   ))}</div>
</section>
    )
}