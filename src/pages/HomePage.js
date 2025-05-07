function HomePage({ snippets, navigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <header className="text-center mb-12 py-10 bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">C++ Code Snippet Hub</h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                    A curated collection of personal C++ code snippets, designed for easy access and reference.
                    Explore solutions to common problems, useful algorithms, and data structures.
                </p>
            </header>

            {/* New Call to Action Button Section - Replaces "Recent Snippets" */}
            <section className="my-16 py-12 bg-gray-800/30 rounded-lg shadow-xl flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Ready to Dive In?
                </h2>
                <p className="text-gray-400 mb-10 text-center text-lg max-w-xl">
                    Browse the complete collection of C++ code snippets, sorted and filterable for your convenience.
                </p>
                <button
                    onClick={() => navigate('snippets')}
                    className="
                        group
                        relative
                        inline-flex
                        items-center
                        justify-center
                        px-10 py-5
                        text-xl font-bold text-white
                        bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600
                        rounded-xl
                        shadow-2xl
                        overflow-hidden
                        transition-all duration-500 ease-in-out
                        hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700
                        hover:scale-105
                        hover:shadow-cyan-400/50
                        focus:outline-none
                        focus:ring-4 focus:ring-cyan-300 focus:ring-opacity-50
                    "
                >
                    {/* Animated background shine effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></span>
                    
                    <span className="relative flex items-center">
                        Explore All Code Snippets
                        <svg 
                            className="w-7 h-7 ml-3 transform transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </span>
                </button>
            </section>
            {/* About This Site Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-white mb-8 border-b-2 border-cyan-500 pb-2">About This Site</h2>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-300 space-y-4">
                    <p>This website serves as my personal digital repository for C++ code snippets. Each snippet is concise, typically one or two functions, and aims to solve a specific problem or demonstrate a particular concept.</p>
                    <p>My goal is to maintain a clean, professional, and user-friendly platform where I can quickly find and reuse code, and also share my solutions. The C++ code is displayed with syntax highlighting that emulates popular IDEs to ensure readability.</p>
                </div>
            </section>
        </div>
    );
}