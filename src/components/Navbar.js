function Navbar({ navigate }) {
    return (
        <nav className="bg-gray-900 text-white p-5 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="text-2xl font-bold cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => navigate('home')}>
                    My C++ Snippets
                </div>
                <div className="space-x-4">
                    <button onClick={() => navigate('home')} className="hover:text-cyan-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</button>
                    <button onClick={() => navigate('snippets')} className="hover:text-cyan-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">All Snippets</button>
                </div>
            </div>
        </nav>
    );
}