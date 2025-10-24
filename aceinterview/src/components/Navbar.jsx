import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react";

export default function Navbar() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsSignedIn(!!token);
    }, []);

    return (
        <nav
            className="
            sticky top-0 z-50 w-full backdrop-blur-sm bg-[var(--card)]/80
            border-b border-[var(--border)]
            text-[var(--foreground)] shadow-[var(--shadow-sm)]
        "
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Brand */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-[var(--primary)]"
                >
                    Ace<span className="text-[var(--accent)]">Interview</span>
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: "Home", to: "/" },
                        { name: "Practice", to: "/practicerole" },
                        { name: "Reports", to: "/reportsview" },
                        { name: "About", to: "/about" },
                    ].map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="
                                relative text-base font-medium transition-colors duration-300 
                                hover:text-[var(--primary)] 
                                after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                                after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300
                                hover:after:w-full
                            "
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Auth Section */}
                    <div className="ml-6">
                        {isSignedIn ? (
                            <Link
                                to="/profile"
                                className="
                                    flex items-center justify-center w-10 h-10 rounded-full 
                                    border border-[var(--primary)]/60 
                                    hover:bg-[var(--primary)]/10 
                                    transition-all duration-300
                                "
                                title="Profile"
                            >
                                <UserCircle2 className="w-6 h-6 text-[var(--primary)]" />
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="
                                    px-5 py-2.5 text-sm font-semibold rounded-full 
                                    border border-[var(--primary)] text-[var(--primary)]
                                    hover:bg-[var(--primary)] hover:text-white 
                                    transition-all duration-300 shadow-sm
                                "
                            >
                                Login / Register
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
