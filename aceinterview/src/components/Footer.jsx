export default function Footer() {
    return (
        <footer className="bg-[var(--card)] text-[var(--muted-foreground)] py-8 border-t border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Copyright */}
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}  <a
                        href="/"
                        className="font-extrabold tracking-tight text-[var(--primary)]"
                    >
                        Ace<span className="text-[var(--accent)]">Interview</span>
                    </a> | ASGProjects
                </p>

                {/* Optional links */}
                <div className="flex gap-6 text-sm">
                    <a href="/privacy" className="hover:text-[var(--primary)] transition-colors">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="hover:text-[var(--primary)] transition-colors">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
}
