export default function RoleCard({ role, isSelected, onSelect }) {
    return (
        <div
            onClick={onSelect}
            className="p-6 rounded-2xl border cursor-pointer transition-all duration-300"
        >
            <div>
                <div>
                    {role.icon}
                </div>
                <h2>{role.name}</h2>
                <p>{role.description}</p>
            </div>
        </div>
    );
}