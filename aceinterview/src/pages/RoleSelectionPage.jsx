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
        <div>
            <h1>Select Your Role</h1>
            <div>
                {roles.map((role) => (
                    <RoleCard
                        key={role.id}
                        role={role}
                        isSelected={selectedRole === role.id}
                        onSelect={() => setSelectedRole(role.id)}
                    />
                ))}
            </div>
        </div>
    )


}