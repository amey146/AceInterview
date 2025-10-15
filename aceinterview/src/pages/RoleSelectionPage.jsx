import { useState, useEffect } from "react";
import { roles } from "../data/roles";
import RoleCard from "../components/RoleCard";
import { useNavigate } from "react-router-dom";
import { isProfessionalEngineer } from "../utils/aiClient";

export default function RoleSelectionPage() {
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("Entry-Level");
    const [isCustom, setIsCustom] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const navigate = useNavigate();

    // Auto-hide error after 10 seconds
    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => setIsError(false), 10000); // 10s
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
            } else {
                setIsError(false);
            }
        }

        localStorage.setItem("selectedRole", selectedRole.trim());
        localStorage.setItem("selectedLevel", selectedLevel);
        navigate("/interview");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            {isError && (
                <div role="alert" className="m-5 w-full max-w-md">
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        Invalid Role
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p>The entered role is not recognized as a professional engineering designation.</p>
                    </div>
                </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold my-8 bg-gradient-to-r from-blue-300 to-teal-400 bg-clip-text text-transparent">
                LEVEL
            </h1>
            <select
                name="selectedLevel"
                id="selectedLevel"
                className="p-4 text-xl border-2 rounded-2xl focus:bg-gray-700"
                onChange={(e) => setSelectedLevel(e.target.value)}
                value={selectedLevel}
            >
                <option value="Entry-Level">Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior-Level">Senior-Level</option>
                <option value="Lead/Principal/Expert-Level">Lead/Principal/Expert-Level</option>
            </select>

            <div className="my-7"></div>

            <h1 className="text-3xl sm:text-4xl font-bold my-8 bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
                ROLE
            </h1>
            <div className="grid grid-cols-3 gap-6 max-w-4xl">
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

            <div className="my-5 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Enter your custom role"
                    className="w-full p-4 text-xl border-2 rounded-2xl focus:bg-gray-700"
                    onChange={(e) => {
                        setSelectedRole(e.target.value);
                        setIsCustom(true);
                        setIsError(false);
                    }}
                    value={isCustom ? selectedRole : ""}
                />
            </div>

            <button
                className="my-10 bg-indigo-500 text-white px-8 py-3 rounded-xl font-medium disabled:bg-gray-600 disabled:cursor-not-allowed hover:from-indigo-600 hover:to-purple-600"
                onClick={handleContinue}
                disabled={!selectedRole.trim() || isChecking}
            >
                {isChecking ? "Checking..." : "Continue"}
            </button>
        </div>
    );
}
