import { useState, useEffect } from "react";
import { roles } from "../data/roles";
import RoleCard from "../components/RoleCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, XCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { isProfessionalEngineer } from "../utils/api";

export default function RoleSelectionPage() {
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("Entry-Level");
    const [isCustom, setIsCustom] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => setIsError(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [isError]);

    async function handleContinue() {
        if (!selectedRole.trim()) return;
        if (isCustom) {
            setIsChecking(true);
            const ans = await isProfessionalEngineer(selectedRole.trim());
            setIsChecking(false);

            if (!ans) {
                setIsError(true);
                return;
            }
        }

        localStorage.setItem("selectedRole", selectedRole.trim());
        localStorage.setItem("selectedLevel", selectedLevel);
        navigate("/interview");
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center 
                        bg-[var(--background)] text-[var(--foreground)] font-sans px-4">

                <section className="flex flex-col items-center gap-12  py-8">
                    {/* Level Selection */}
                    <div className="w-full max-w-3xl text-center space-y-4">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-bold text-[var(--primary)] drop-shadow-md tracking-tight">
                                Select Your Experience Level
                            </h2>
                            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto leading-relaxed">
                                Choose the level that best matches your experience.
                            </p>
                        </div>
                        <select
                            name="selectedLevel"
                            id="selectedLevel"
                            className="w-full p-4 text-lg rounded-[var(--radius)] bg-[var(--card)] text-[var(--card-foreground)]
                 border border-[var(--border)] shadow-clay focus:ring-2 focus:ring-[var(--ring)] transition cursor-pointer"
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            value={selectedLevel}
                        >
                            <option>Entry-Level</option>
                            <option>Mid-Level</option>
                            <option>Senior-Level</option>
                            <option>Lead / Principal / Expert-Level</option>
                        </select>
                    </div>

                    {/* Divider */}
                    <div className="w-full max-w-3xl border-t border-[var(--border)] my-4"></div>

                    {/* Role Selection */}
                    <div className="w-full max-w-5xl text-center space-y-6">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-bold text-[var(--primary)] drop-shadow-md tracking-tight">
                                Select Your Role
                            </h2>
                            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto leading-relaxed">
                                Choose a role that describes your area of expertise.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {roles.map((role) => (
                                <RoleCard
                                    key={role.id}
                                    role={role}
                                    isSelected={selectedRole === role.name}
                                    onSelect={() => {
                                        setSelectedRole(role.name);
                                        setIsCustom(false);
                                        setIsError(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <div className="my-5 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Enter your custom role"
                        className="w-full p-4 text-xl rounded-[var(--radius)] bg-[var(--card)] 
                               border border-[var(--border)] shadow-clay focus:ring-2 focus:ring-[var(--ring)] transition"
                        onChange={(e) => {
                            setSelectedRole(e.target.value);
                            setIsCustom(true);
                            setIsError(false);
                        }}
                        value={isCustom ? selectedRole : ""}
                    />
                </div>
                {isError && (
                    <div role="alert" className="m-5 w-full max-w-md shadow-clay rounded-2xl bg-[var(--destructive)] text-[var(--destructive-foreground)] p-5">
                        <p className="font-semibold text-center text-xl"> <XCircle className="inline-block" /> Invalid Role</p>
                        <p className="text-sm text-center mt-2 opacity-90">
                            The entered role is not recognized as a professional engineering designation.
                        </p>
                    </div>
                )}

                <button
                    className="my-10 px-10 py-3 rounded-[var(--radius)] font-medium 
                           bg-[var(--primary)] text-[var(--primary-foreground)] shadow-clay 
                           hover:scale-[1.03] transition-transform disabled:opacity-60 cursor-pointer"
                    onClick={handleContinue}
                    disabled={!selectedRole.trim() || isChecking}
                >
                    {isChecking ? "Checking..." : "Continue"}
                </button>
            </div>
            <Footer />
        </>
    );
}
