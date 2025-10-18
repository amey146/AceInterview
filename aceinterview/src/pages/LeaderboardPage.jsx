import { useEffect, useState } from "react";
import { getLeaderboard } from "../utils/api";

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        getLeaderboard().then(setLeaders);
    }, []);

    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
            <ul>
                {leaders.map((user, i) => (
                    <li key={i} className="border-b border-gray-700 py-2">
                        <span>{i + 1}. {user._id}</span> — <b>{user.avgScore.toFixed(2)}</b>
                    </li>
                ))}
            </ul>
        </div>
    );
}
