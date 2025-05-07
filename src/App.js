function App() {
    // Destructure React hooks for use within the component.
    // For standalone Babel, React is available on the window object.
    const { useState, useEffect, useMemo } = React;

    // ---------- STATE MANAGEMENT ----------
    const [currentPage, setCurrentPage] = useState('home'); // Current page being displayed (e.g., 'home', 'snippets', 'snippet/1')
    const [searchTerm, setSearchTerm] = useState(''); // User's input in the search bar
    const [selectedTag, setSelectedTag] = useState(null); // Currently selected tag for filtering
    // Default sort order is now by perceived complexity, ascending (easiest first)
    const [sortOrder, setSortOrder] = useState('complexity-asc'); // Sort order for snippets
    const [copyNotification, setCopyNotification] = useState(''); // Notification message after copying code
    
    const [snippets, setSnippets] = useState([]); // Array to hold all snippet data (metadata + fetched code)
    const [isLoading, setIsLoading] = useState(true); // Boolean to track if snippets are being loaded
    const [error, setError] = useState(null); // Stores any error message during data fetching

    // ---------- EFFECTS ----------

    // useEffect hook to load snippet data when the component mounts.
    useEffect(() => {
        // Asynchronous function to fetch snippet metadata and code content.
        const loadSnippets = async () => {
            setIsLoading(true); // Set loading state to true at the start
            setError(null);     // Clear any previous errors

            try {
                // Check if the snippetsManifest (loaded from snippetsManifest.js) is available globally.
                if (!window.snippetsManifest || !Array.isArray(window.snippetsManifest)) {
                    console.error("Snippets manifest (window.snippetsManifest) not found or is not an array.");
                    setError("Failed to load snippet definitions. Manifest is missing.");
                    setIsLoading(false);
                    return;
                }

                // Use Promise.all to fetch code for all snippets concurrently.
                const fetchedSnippetsPromises = window.snippetsManifest.map(async (meta) => {
                    // Check if filePath is defined for the current snippet metadata.
                    if (!meta.filePath) {
                        console.warn(`Snippet with title "${meta.title}" (ID: ${meta.id}) has no filePath defined.`);
                        // Return metadata with a placeholder or error message for the code.
                        return { ...meta, code: `// Code file path not specified for snippet ID: ${meta.id}`, perceivedComplexity: meta.perceivedComplexity || 0 };
                    }
                    try {
                        // Fetch the code file content using the browser's fetch API.
                        const response = await fetch(meta.filePath);
                        // Check if the fetch request was successful.
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status} for ${meta.filePath}`);
                        }
                        const code = await response.text(); // Get the code content as text.
                        // Ensure perceivedComplexity is carried over or defaulted if missing in manifest
                        return { ...meta, code, perceivedComplexity: meta.perceivedComplexity || 0 }; // Combine the fetched code with its metadata.
                    } catch (fileError) {
                        console.error(`Failed to fetch code for snippet "${meta.title}" (ID: ${meta.id}) from ${meta.filePath}:`, fileError);
                        // Return metadata with an error message for the code if fetching fails.
                        return { ...meta, code: `// Error loading code for snippet ID: ${meta.id}\n// ${fileError.message}`, perceivedComplexity: meta.perceivedComplexity || 0 };
                    }
                });
                
                const resolvedSnippets = await Promise.all(fetchedSnippetsPromises);
                setSnippets(resolvedSnippets.filter(s => s !== null)); // Update state with all fetched snippets.

            } catch (err) {
                // Catch any general errors during the loading process.
                console.error("Error loading snippets:", err);
                setError("An unexpected error occurred while loading snippets.");
            } finally {
                // Set loading state to false once fetching is complete (success or failure).
                setIsLoading(false);
            }
        };

        loadSnippets(); // Call the function to load snippets.
    }, []); // Empty dependency array: this effect runs only once when the component mounts.

    // useEffect hook to re-apply Prism.js syntax highlighting.
    // This runs after snippets are loaded or when page/filters change.
    useEffect(() => {
        // Check if not loading, snippets are available, and Prism.js is loaded.
        if (!isLoading && snippets.length > 0 && typeof Prism !== 'undefined' && Prism.highlightAll) {
            const timer = setTimeout(() => { // Use a timeout to ensure DOM is ready.
                try {
                    Prism.highlightAll();
                } catch (e) {
                    console.error("Prism.highlightAll() failed:", e);
                }
            }, 0);
            return () => clearTimeout(timer); // Cleanup timer.
        }
    }, [isLoading, snippets, currentPage, searchTerm, selectedTag]); // Dependencies for re-highlighting.

    // ---------- HELPER FUNCTIONS ----------
    // (navigate, handleSearchChange, handleTagSelect, copyToClipboard remain the same as previous versions)
    const navigate = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
        setCopyNotification('');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setSearchTerm('');
        navigate('snippets');
    };
    
    const copyToClipboard = (text, snippetTitle) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyNotification(`Copied: ${snippetTitle}!`);
            setTimeout(() => setCopyNotification(''), 3000);
        }).catch(err => {
            console.error('Copy failed: ', err);
            setCopyNotification('Copy failed.');
            setTimeout(() => setCopyNotification(''), 3000);
        });
    };
    
    // Memoized calculation for unique tags.
    const allTags = useMemo(() => {
        const tagsSet = new Set();
        if (Array.isArray(snippets)) {
            snippets.forEach(snippet => {
                if (snippet && Array.isArray(snippet.tags)) {
                    snippet.tags.forEach(tag => tagsSet.add(tag));
                }
            });
        }
        return Array.from(tagsSet).sort();
    }, [snippets]);

    // Memoized calculation for displayed snippets based on filters and sorting.
    const displayedSnippets = useMemo(() => {
        let filtered = Array.isArray(snippets) ? [...snippets] : [];

        if (selectedTag) {
            filtered = filtered.filter(s => s && Array.isArray(s.tags) && s.tags.includes(selectedTag));
        }
        if (searchTerm) {
            filtered = filtered.filter(s =>
                (s && s.title && s.title.toLowerCase().includes(searchTerm)) ||
                (s && s.description && s.description.toLowerCase().includes(searchTerm)) ||
                (s && Array.isArray(s.tags) && s.tags.some(t => t.toLowerCase().includes(searchTerm)))
            );
        }
        
        return filtered.sort((a, b) => {
            if (!a || !b) return 0;
            // Ensure perceivedComplexity is a number, default to a high value if missing for sorting
            const complexityA = typeof a.perceivedComplexity === 'number' ? a.perceivedComplexity : Infinity;
            const complexityB = typeof b.perceivedComplexity === 'number' ? b.perceivedComplexity : Infinity;

            switch (sortOrder) {
                case 'title-asc': return (a.title || "").localeCompare(b.title || "");
                case 'title-desc': return (b.title || "").localeCompare(a.title || "");
                case 'complexity-asc': return complexityA - complexityB; // Sort by complexity ascending
                case 'complexity-desc': return complexityB - complexityA; // Sort by complexity descending
                default: return complexityA - complexityB; // Default to complexity ascending
            }
        });
    }, [snippets, searchTerm, selectedTag, sortOrder]);


    // ---------- RENDER LOGIC ----------
    // Function to determine which page component to render.
    const renderPage = () => {
        // Access page components from the window object (for standalone Babel setup).
        const HomePageComponent = window.HomePage;
        const SnippetListPageComponent = window.SnippetListPage;
        const SnippetDetailPageComponent = window.SnippetDetailPage;

        // Display loading message if data is being fetched.
        if (isLoading) {
            return <div className="container mx-auto px-4 py-8 text-center text-xl text-gray-300">Loading snippets... Please wait.</div>;
        }
        // Display error message if fetching failed.
        if (error) {
            return <div className="container mx-auto px-4 py-8 text-center text-xl text-red-400">Error: {error}</div>;
        }

        // Route to Snippet Detail Page.
        if (currentPage.startsWith('snippet/') && SnippetDetailPageComponent) {
            return <SnippetDetailPageComponent 
                        currentPage={currentPage} 
                        snippets={snippets} // Pass all loaded snippets
                        navigate={navigate} 
                        copyToClipboard={copyToClipboard} 
                        copyNotification={copyNotification}
                        handleTagSelect={handleTagSelect} 
                    />;
        }
        // Route to other pages.
        switch (currentPage) {
            case 'home':
                return HomePageComponent ? <HomePageComponent snippets={displayedSnippets} navigate={navigate} /> : <div className="text-red-500 p-4">Error: HomePage component not loaded.</div>;
            case 'snippets':
                return SnippetListPageComponent ? <SnippetListPageComponent 
                            displayedSnippets={displayedSnippets} // Pass filtered and sorted snippets
                            searchTerm={searchTerm}
                            handleSearchChange={handleSearchChange}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            selectedTag={selectedTag}
                            allTags={allTags}
                            handleTagSelect={handleTagSelect}
                            navigate={navigate}
                        /> : <div className="text-red-500 p-4">Error: SnippetListPage component not loaded.</div>;
            default:
                // Fallback to HomePage.
                return HomePageComponent ? <HomePageComponent snippets={displayedSnippets} navigate={navigate} /> : <div className="text-red-500 p-4">Error: HomePage component not loaded (fallback).</div>;
        }
    };

    // Access Navbar and Footer components from the window object.
    const NavbarComponent = window.Navbar;
    const FooterComponent = window.Footer;

    // Main return statement for the App component.
    return (
        <> {/* React.Fragment shorthand */}
            {NavbarComponent ? <NavbarComponent navigate={navigate} /> : <div className="text-red-500 p-2 bg-gray-800 text-center">Navbar Error</div>}
            
            <main className="pb-10 flex-grow"> 
                {renderPage()} {/* Render the determined page */}
            </main>
            
            {FooterComponent ? <FooterComponent /> : <div className="text-red-500 p-2 bg-gray-800 text-center">Footer Error</div>}
        </>
    );
}