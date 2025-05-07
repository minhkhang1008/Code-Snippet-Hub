function SnippetCard({ snippet, navigate }) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">{snippet.title}</h3>
                <p className="text-gray-400 text-sm mb-3 h-16 overflow-hidden text-ellipsis">
                    {snippet.description.split(' ').slice(0, 20).join(' ') + (snippet.description.split(' ').length > 20 ? '...' : '')}
                </p>
                <div className="mb-3">
                    {snippet.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-700 text-cyan-300 px-2 py-1 rounded-full mr-1 mb-1 inline-block">
                            {tag}
                        </span>
                    ))}
                    {snippet.tags.length > 3 && <span className="text-xs text-gray-500 ml-1">+{snippet.tags.length - 3} more</span>}
                </div>
                <div className="text-xs text-gray-500 mb-4">
                    <span>Created: {new Date(snippet.dateCreated).toLocaleDateString()}</span> | 
                    <span> Updated: {new Date(snippet.lastUpdated).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="p-6 pt-0">
                <button
                    onClick={() => navigate(`snippet/${snippet.id}`)}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}