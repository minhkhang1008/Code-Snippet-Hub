function SnippetDetailPage({ currentPage, snippets, navigate, copyToClipboard, copyNotification, handleTagSelect }) {
    const React = window.React; // For standalone Babel
    const snippetId = currentPage.split('/')[1];
    const snippet = snippets.find(s => s.id === snippetId);

    React.useEffect(() => {
        if (snippet && typeof Prism !== 'undefined') {
             const timer = setTimeout(() => {
                Prism.highlightAll();
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [snippet]);

    if (!snippet) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold text-red-500">Snippet Not Found</h1>
                <button onClick={() => navigate('snippets')} className="mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Back to All Snippets
                </button>
            </div>
        );
    }
    
    const renderFormattedText = (text, isComplexity = false) => {
        if (!text) return null;
        let htmlText = text;
        htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        htmlText = htmlText.replace(/\*(.*?)\*/g, '<em>$1</em>');
        htmlText = htmlText.replace(/`(.*?)`/g, '<code class="bg-gray-700 text-cyan-300 px-1 py-0.5 rounded text-sm font-mono">$1</code>');

        if (isComplexity) {
            htmlText = htmlText.replace(/log_([a-zA-Z0-9]+)\s*([a-zA-Z0-9]+)/g, 'log<sub>$1</sub> $2');
            htmlText = htmlText.replace(/([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g, '$1<sup>$2</sup>');
        }
        return <span dangerouslySetInnerHTML={{ __html: htmlText }} />;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => navigate('snippets')} className="mb-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to All Snippets
            </button>

            <article className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <header className="p-6 border-b border-gray-700">
                    <h1 className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">{snippet.title}</h1>
                    <div className="text-sm text-gray-500 mb-3">
                        <span>Created: {new Date(snippet.dateCreated).toLocaleDateString()}</span> | 
                        <span> Last Updated: {new Date(snippet.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div>
                        {snippet.tags.map(tag => (
                            <span 
                                key={tag} 
                                className="text-xs bg-gray-700 text-cyan-300 px-2 py-1 rounded-full mr-1 mb-1 inline-block cursor-pointer hover:bg-cyan-700 hover:text-white transition-colors" 
                                onClick={() => handleTagSelect(tag)}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="p-6 relative">
                    <pre className="line-numbers rounded-md language-cpp" style={{maxHeight: '600px', overflow: 'auto'}}>
                        <code className={`language-${snippet.language}`}>
                            {snippet.code}
                        </code>
                    </pre>
                    <button
                        onClick={() => copyToClipboard(snippet.code, snippet.title)} // Pass title for notification
                        className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-gray-700 hover:bg-cyan-600 text-white font-semibold py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-lg text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow"
                        title="Copy code to clipboard"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="hidden sm:inline">Copy</span>
                    </button>
                </div>
                
                {copyNotification && (
                    <div className="fixed bottom-4 right-4 bg-green-600 text-white py-3 px-5 rounded-lg shadow-lg transition-all duration-300 ease-out transform translate-y-0 opacity-100"
                         role="alert"
                    >
                        {copyNotification}
                    </div>
                )}

                <section className="p-6 border-t border-gray-700">
                    <h2 className="text-2xl font-semibold text-white mb-3">Description</h2>
                    <div className="text-gray-300 prose prose-sm sm:prose-base prose-invert max-w-none leading-relaxed">{renderFormattedText(snippet.description)}</div>
                </section>

                {snippet.explanation && (
                    <section className="p-6 border-t border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-4">Detailed Explanation</h2>
                        <div className="space-y-5 text-gray-300">
                            {snippet.explanation.logic && (
                                <div>
                                    <h3 className="text-lg font-semibold text-cyan-400 mb-1.5">Logic/Algorithm:</h3>
                                    <div className="prose prose-sm sm:prose-base prose-invert max-w-none leading-relaxed">{renderFormattedText(snippet.explanation.logic)}</div>
                                </div>
                            )}
                            {snippet.explanation.useCases && (
                                <div>
                                    <h3 className="text-lg font-semibold text-cyan-400 mb-1.5">Potential Use Cases:</h3>
                                    <div className="prose prose-sm sm:prose-base prose-invert max-w-none leading-relaxed">{renderFormattedText(snippet.explanation.useCases)}</div>
                                </div>
                            )}
                            {snippet.explanation.complexity && (
                                <div>
                                    <h3 className="text-lg font-semibold text-cyan-400 mb-1.5">Time and Space Complexity:</h3>
                                    <div className="prose prose-sm sm:prose-base prose-invert max-w-none leading-relaxed">{renderFormattedText(snippet.explanation.complexity, true)}</div>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
}