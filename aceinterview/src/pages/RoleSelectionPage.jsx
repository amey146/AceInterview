import { useState, useEffect } from "react";
import { roles } from "../data/roles";
import RoleCard from "../components/RoleCard";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { isProfessionalEngineer } from "../utils/api";

export default function RoleSelectionPage() {
    const [selectedRole, setSelectedRole] = useState(""); // string or role object
    const [selectedLevel, setSelectedLevel] = useState("Entry-Level");
    const [numQuestions, setNumQuestions] = useState(5);
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
        const roleValue =
            typeof selectedRole === "string" ? selectedRole.trim() : selectedRole?.mainRole || "";

        if (!roleValue) return;

        if (isCustom) {
            setIsChecking(true);
            const ans = await isProfessionalEngineer(roleValue);
            setIsChecking(false);

            if (!ans) {
                setIsError(true);
                return;
            }
        }

        // Store a normalized value
        localStorage.setItem("selectedRole", roleValue);
        localStorage.setItem("selectedLevel", selectedLevel);
        localStorage.setItem("numQuestions", numQuestions);

        navigate("/interview");
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] font-sans px-4">
                <section className="flex flex-col items-center gap-12 py-8 w-full max-w-5xl">
                    {/* Experience Level */}
                    <div className="text-center space-y-4 w-full max-w-3xl">
                        <h2 className="text-4xl font-bold text-[var(--primary)] drop-shadow-md tracking-tight">
                            Select Your Experience Level
                        </h2>
                        <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
                            Choose the level that best matches your experience.
                        </p>
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="w-full p-4 mt-2 text-lg rounded-[var(--radius)] bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] shadow-clay focus:ring-2 focus:ring-[var(--ring)] transition cursor-pointer"
                        >
                            <option>Absolute Beginner</option>
                            <option>Entry-Level</option>
                            <option>Mid-Level</option>
                            <option>Senior-Level</option>
                            <option>Lead / Principal / Expert-Level</option>
                        </select>
                    </div>

                    <div className="w-full max-w-3xl border-t border-[var(--border)] my-4"></div>

                    {/* Role Selection */}
                    <div className="text-center space-y-4 w-full">
                        <h2 className="text-4xl font-bold text-[var(--primary)] drop-shadow-md tracking-tight">
                            Select Your Role
                        </h2>
                        <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto leading-relaxed">
                            Choose a role that describes your area of expertise or type a custom role below.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {roles.map((role) => (
                                <RoleCard
                                    key={role.id}
                                    role={role}
                                    isSelected={selectedRole === role}
                                    onSelect={() => {
                                        setSelectedRole(role);
                                        setIsCustom(false);
                                        setIsError(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Custom Role */}
                <div className="my-5 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Enter your custom role"
                        value={isCustom ? selectedRole : ""}
                        onChange={(e) => {
                            setSelectedRole(e.target.value);
                            setIsCustom(true);
                            setIsError(false);
                        }}
                        className="w-full p-4 text-xl rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)] shadow-clay focus:ring-2 focus:ring-[var(--ring)] transition"
                    />
                </div>

                {isError && (
                    <div
                        role="alert"
                        className="m-5 w-full max-w-md shadow-clay rounded-2xl bg-[var(--destructive)] text-[var(--destructive-foreground)] p-5"
                    >
                        <p className="font-semibold text-center text-xl">
                            <XCircle className="inline-block" /> Invalid Role
                        </p>
                        <p className="text-sm text-center mt-2 opacity-90">
                            The entered role is not recognized as a professional engineering designation.
                        </p>
                    </div>
                )}

                {/* Number of Questions */}
                <div className="my-5 w-full">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-[var(--primary)] drop-shadow-md tracking-tight">
                            Select Number of Questions
                        </h2>
                        <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto leading-relaxed">
                            Choose the number of questions you want to answer.
                        </p>
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(e.target.value)}
                            className="w-40 text-[8rem] font-black text-[var(--primary)] text-center bg-transparent outline-none appearance-none selection:bg-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
                        />
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={
                        (typeof selectedRole === "string" ? !selectedRole.trim() : !selectedRole?.mainRole) ||
                        isChecking
                    }
                    // tooltip
                    title={
                        (typeof selectedRole === "string"
                            ? !selectedRole.trim()
                                ? "Please select a role or enter a custom role"
                                : ""
                            : !selectedRole?.mainRole
                                ? "Please select a role"
                                : "") + (isChecking ? " Checking role validity..." : "")
                    }
                    className="my-10 px-10 py-3 rounded-[var(--radius)] font-medium bg-[var(--primary)] text-[var(--primary-foreground)] shadow-clay hover:scale-[1.03] transition-transform disabled:opacity-60 cursor-pointer"
                >
                    {isChecking ? "Checking..." : "Continue"}
                </button>
            </div>
            <Footer />
        </>
    );
}
