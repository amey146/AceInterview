import { useState } from "react";
import { roles } from "../data/roles";
import RoleCard from "../components/RoleCard";
import { useNavigate } from "react-router-dom";

// Practice Page
export default function RoleSelectionPage() {
    //useState hook to manage the selected role
    const [selectedRole, setSelectedRole] = useState(null);
    //useNavigate hook to programmatically navigate to different routes
    const navigate = useNavigate();

    //function handles the
    const handleContinue = () => {
        //if a role is selected, store it in localStorage and navigate to the interview page
        if (selectedRole) {
            localStorage.setItem("selectedRole", selectedRole);
            navigate("/interview");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            <h1 className="text-3xl sm:text-4xl font-bold my-8 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">Select Your Role</h1>
            <div className="grid grid-cols-1 gap-6 max-w-4xl">
                {roles.map((role) => (
                    <RoleCard
                        key={role.id}
                        role={role}
                        isSelected={selectedRole === role.name}
                        onSelect={() => setSelectedRole(role.name)}
                    />
                ))}
            </div>

            <button className="my-10 bg-indigo-500 text-white px-8 py-3 rounded-xl font-medium disabled:bg-gray-600 disabled:cursor-not-allowed transition-all" onClick={handleContinue} disabled={!selectedRole}>
                Continue
            </button>
        </div>
    )


}