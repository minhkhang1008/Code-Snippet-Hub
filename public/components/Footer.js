function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-400 p-6 text-center mt-auto"> {/* Changed mt-12 to mt-auto for sticky footer effect */}
            <p>&copy; {new Date().getFullYear()} Your Name Here. All rights reserved.</p>
            <p className="text-sm">Powered by React & Tailwind CSS. Syntax highlighting by Prism.js.</p>
        </footer>
    );
}