export default function RoleCard({ role, isSelected, onSelect }) {
    return (
        <div
            onClick={onSelect}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${isSelected ? "border-indigo-500 shadow-lg scale-105" : "border-gray-700"} bg-gray-800/60 hover:shadow-xl hover:scale-105 backdrop-blur-md`}
        >
            <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">
                    {role.icon}
                </div>
                <h2 className="text-xl font-semibold">{role.name}</h2>
                <p className="text-sm text-gray-400 mt-2 text-center">{role.description}</p>
            </div>
        </div>
    );
}