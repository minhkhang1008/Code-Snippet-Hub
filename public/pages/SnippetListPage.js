function SnippetListPage({ 
    displayedSnippets, 
    searchTerm, 
    handleSearchChange, 
    sortOrder, 
    setSortOrder, 
    selectedTag, 
    allTags,
    handleTagSelect,
    navigate 
}) {
    // State to manage visibility of the tags filter section
    const [showTags, setShowTags] = React.useState(false);

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-white text-center mb-6">All Code Snippets</h1>
                {/* Search and Sort Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-800 rounded-lg shadow-md items-center">
                    <input
                        type="text"
                        placeholder="Search by title, tag, or description..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-grow p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none w-full md:w-auto"
                    />
                    <select 
                        onChange={(e) => setSortOrder(e.target.value)} 
                        value={sortOrder}
                        className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none appearance-none w-full md:w-auto"
                        // Custom arrow for select dropdown
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239ca3af'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                    >
                        {/* Updated Sort Options */}
                        <option value="complexity-asc">Sort by Difficulty (Easiest)</option>
                        <option value="complexity-desc">Sort by Difficulty (Hardest)</option>
                        <option value="title-asc">Sort by Title (A-Z)</option>
                        <option value="title-desc">Sort by Title (Z-A)</option>
                    </select>
                </div>

                {/* Toggle Button for Tags Filter */}
                <div className="text-center mb-4">
                    <button
                        onClick={() => setShowTags(!showTags)}
                        className="bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 flex items-center justify-center mx-auto group"
                    >
                        <svg 
                            className={`w-5 h-5 mr-2 transition-transform duration-300 ease-in-out group-hover:scale-110 ${showTags ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                        {showTags ? 'Hide Tags' : 'Show Tags to Filter'}
                    </button>
                </div>

                {/* Collapsible Tags Section */}
                <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${showTags ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="py-4 text-center bg-gray-800/50 rounded-lg mb-8 shadow">
                        <span className="text-gray-300 mr-2 font-semibold block mb-3">Filter by Tag:</span>
                        <button 
                            onClick={() => handleTagSelect(null)}
                            className={`text-sm ${selectedTag === null ? 'bg-cyan-600 text-white ring-2 ring-cyan-400' : 'bg-gray-700 text-cyan-300'} hover:bg-cyan-500 hover:text-white px-3 py-1.5 rounded-full mr-2 mb-2 transition-all duration-200 shadow-sm hover:shadow-md`}
                        >
                            All Tags
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => handleTagSelect(tag)}
                                className={`text-sm ${selectedTag === tag ? 'bg-cyan-600 text-white ring-2 ring-cyan-400' : 'bg-gray-700 text-cyan-300'} hover:bg-cyan-500 hover:text-white px-3 py-1.5 rounded-full mr-2 mb-2 transition-all duration-200 shadow-sm hover:shadow-md`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Snippet Cards Display */}
            {displayedSnippets && displayedSnippets.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedSnippets.map(snippet => <SnippetCard key={snippet?.id || Math.random()} snippet={snippet} navigate={navigate} />)}
                </div>
            ) : (
                <p className="text-gray-400 text-center text-xl py-10">
                    {selectedTag && searchTerm ? `No snippets found for tag "${selectedTag}" and search term "${searchTerm}".` :
                     selectedTag ? `No snippets found for tag "${selectedTag}".` :
                     searchTerm ? `No snippets found for search term "${searchTerm}".` :
                     "No snippets available. Try adding some or adjusting your filters!"}
                </p>
            )}
        </div>
    );
}
