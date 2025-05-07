function App() {
    const { useState, useEffect, useMemo } = React;

    const [currentPage, setCurrentPage] = useState('home');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortOrder, setSortOrder] = useState('complexity-asc');
    const [copyNotification, setCopyNotification] = useState('');
    const [snippets, setSnippets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSnippets = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (!window.snippetsManifest || !Array.isArray(window.snippetsManifest)) {
                    console.error("snippetsManifest not found or invalid.");
                    setError("Manifest missing.");
                    setIsLoading(false);
                    return;
                }

                const fetched = window.snippetsManifest.map(async (meta) => {
                    if (!meta.filePath) {
                        return { ...meta, code: '// No filePath provided', perceivedComplexity: meta.perceivedComplexity || 0 };
                    }
                    try {
                        const res = await fetch(meta.filePath);
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        const code = await res.text();
                        return { ...meta, code, perceivedComplexity: meta.perceivedComplexity || 0 };
                    } catch (err) {
                        console.error(`Error loading ${meta.title}:`, err);
                        return { ...meta, code: `// Failed to load\n// ${err.message}`, perceivedComplexity: meta.perceivedComplexity || 0 };
                    }
                });

                const resolvedSnippets = await Promise.all(fetched);
                setSnippets(resolvedSnippets.filter(Boolean));
            } catch (err) {
                console.error("Unexpected error:", err);
                setError("Unexpected error during loading.");
            } finally {
                setIsLoading(false);
            }
        };

        loadSnippets();
    }, []);

    useEffect(() => {
        if (!isLoading && snippets.length > 0 && typeof Prism !== 'undefined') {
            const timer = setTimeout(() => {
                try {
                    Prism.highlightAll();
                } catch (e) {
                    console.error("Prism failed:", e);
                }
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [isLoading, snippets, currentPage, searchTerm, selectedTag]);

    const navigate = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
        setCopyNotification('');
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setSearchTerm('');
        navigate('snippets');
    };

    const copyToClipboard = (text, title) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyNotification(`Copied: ${title}!`);
            setTimeout(() => setCopyNotification(''), 3000);
        }).catch(err => {
            console.error('Copy error:', err);
            setCopyNotification('Copy failed.');
            setTimeout(() => setCopyNotification(''), 3000);
        });
    };

    const allTags = useMemo(() => {
        const tagSet = new Set();
        snippets.forEach(s => s?.tags?.forEach(tag => tagSet.add(tag)));
        return Array.from(tagSet).sort();
    }, [snippets]);

    const displayedSnippets = useMemo(() => {
        let filtered = [...snippets];
        if (selectedTag) {
            filtered = filtered.filter(s => s.tags?.includes(selectedTag));
        }
        if (searchTerm) {
            filtered = filtered.filter(s =>
                s.title?.toLowerCase().includes(searchTerm) ||
                s.description?.toLowerCase().includes(searchTerm) ||
                s.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        return filtered.sort((a, b) => {
            const complexityA = a.perceivedComplexity ?? Infinity;
            const complexityB = b.perceivedComplexity ?? Infinity;
            switch (sortOrder) {
                case 'title-asc': return a.title.localeCompare(b.title);
                case 'title-desc': return b.title.localeCompare(a.title);
                case 'complexity-desc': return complexityB - complexityA;
                default: return complexityA - complexityB;
            }
        });
    }, [snippets, searchTerm, selectedTag, sortOrder]);

    const renderPage = () => {
        const HomePageComponent = window.HomePage;
        const SnippetListPageComponent = window.SnippetListPage;
        const SnippetDetailPageComponent = window.SnippetDetailPage;

        if (isLoading) {
            return <div className="container mx-auto px-4 py-8 text-center text-xl text-gray-300">Loading snippets... Please wait.</div>;
        }

        if (error) {
            return <div className="container mx-auto px-4 py-8 text-center text-xl text-red-400">Error: {error}</div>;
        }

        if (currentPage === 'snippets' && SnippetListPageComponent) {
            return <SnippetListPageComponent
                displayedSnippets={displayedSnippets}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                selectedTag={selectedTag}
                allTags={allTags}
                handleTagSelect={handleTagSelect}
                navigate={navigate}
            />;
        }

        if (currentPage.startsWith('snippet/') && SnippetDetailPageComponent) {
            return <SnippetDetailPageComponent
                currentPage={currentPage}
                snippets={snippets}
                navigate={navigate}
                copyToClipboard={copyToClipboard}
                copyNotification={copyNotification}
                handleTagSelect={handleTagSelect}
            />;
        }

        if (HomePageComponent) {
            return <HomePageComponent snippets={displayedSnippets} navigate={navigate} />;
        }

        return <div className="text-center text-red-500 mt-10 text-xl">Failed to load page component.</div>;
    };

    const NavbarComponent = window.Navbar;
    const FooterComponent = window.Footer;

    return (
        <>
            {NavbarComponent ? <NavbarComponent navigate={navigate} /> : <div className="text-red-500 p-2 bg-gray-800 text-center">Navbar Error</div>}
            <main className="pb-10 flex-grow">
                {renderPage()}
            </main>
            {FooterComponent ? <FooterComponent /> : <div className="text-red-500 p-2 bg-gray-800 text-center">Footer Error</div>}
        </>
    );
}
