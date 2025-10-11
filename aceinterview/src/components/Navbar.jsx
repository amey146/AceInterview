export default function Navbar() {
    return(
        <nav className="flex justify-between items-center px-6 py-4 bg-cyan-900 text-white">
            <h1 className="text-xl font-bold">Ace Interview</h1>
            <div className="space-x-6">
                <a href="/" className="hover:text-blue-200 hover:font-bold">Home</a>
                <a href="/practice" className="hover:text-blue-200 hover:font-bold">Practice</a>
                <a href="/about" className="hover:text-blue-200 hover:font-bold">About</a>
            </div>
        </nav>
    )
}