export default function Navbar() {
    return (
        <nav
            className="
        sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--card)]/80
        border-b border-[var(--border)]
        text-[var(--foreground)] shadow-[var(--shadow-sm)]
      "
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Brand */}
                <a
                    href="/"
                    className="text-2xl font-extrabold tracking-tight text-[var(--primary)]"
                >
                    Ace<span className="text-[var(--accent)]">Interview</span>
                </a>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: "Home", href: "/" },
                        { name: "Practice", href: "/practicerole" },
                        { name: "About", href: "/about" },
                    ].map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="
                relative text-base font-medium transition-colors duration-300 
                hover:text-[var(--primary)] 
                after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300
                hover:after:w-full
              "
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
