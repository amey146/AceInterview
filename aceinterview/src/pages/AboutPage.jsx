import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import aboutImage from "../assets/about.jpg";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center flex-1 p-8 gap-8 max-w-6xl mx-auto w-full">

                    {/* Left Text Section */}
                    <div className="flex-1 space-y-6">
                        <h1 className="text-4xl font-extrabold text-[var(--primary)]">About Our Platform</h1>
                        <p className="text-lg text-[var(--muted-foreground)]">
                            Welcome to our AI Interviewer! Our goal is to help you prepare for interviews in the most effective way possible. We provide personalised questions, instant feedback, and practical tips to help you improve and perform at your best.
                        </p>
                        <p className="text-lg text-[var(--muted-foreground)]">
                            With the power of advanced AI, we recreate real interview situations so that you can build the confidence you need. Our platform is designed with a user-friendly interface and a modern, soft claymorphic look to make your learning experience both enjoyable and visually appealing.
                        </p>
                        <p className="text-lg text-[var(--muted-foreground)]">
                            Whether you're a fresh graduate or an experienced professional, our tools are tailored to your level and will help you ace your next interview with ease.
                        </p>
                    </div>


                    {/* Right Image Section */}
                    <div className="flex-1 flex justify-center md:justify-end">
                        <div className="w-full md:w-[500px] h-[350px] md:h-[500px] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)]">
                            <img
                                src={aboutImage}
                                alt="About illustration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}
