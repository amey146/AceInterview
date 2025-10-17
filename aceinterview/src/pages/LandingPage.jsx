import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import StepsSection from "../components/StepsSection";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FeatureSection />
            <StepsSection />
            <Footer />
        </>
    );
}
