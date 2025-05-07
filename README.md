# C++ Code Snippet Showcase

Welcome to the C++ Code Snippet Showcase! This is a personal web application designed to store, display, and manage a curated collection of C++ code snippets. It offers a clean, professional, and user-friendly interface with IDE-like syntax highlighting for an optimal viewing experience.

## ✨ Features

* **Modern & Clean UI:** Professional, uncluttered layout built with React and styled with Tailwind CSS.
* **IDE-like Syntax Highlighting:** C++ code is beautifully highlighted using Prism.js (Okaidia theme), complete with line numbers.
* **Responsive Design:** Fully responsive across desktops, tablets, and smartphones.
* **Snippet Management:**
    * Code snippets are stored in individual `.cpp` files.
    * Metadata (title, description, tags, explanations, complexity rating) is managed in a central `snippetsManifest.js` file.
* **Dynamic Fetching:** Snippet code is fetched dynamically from their respective files.
* **Snippet Listing Page:**
    * **Search Functionality:** Search snippets by title, description, or tags.
    * **Filtering:** Filter snippets by tags (tags section is collapsible with animation).
    * **Sorting:** Sort snippets by:
        * Perceived Complexity (Easiest/Hardest - default)
        * Title (A-Z/Z-A)
* **Snippet Detail Page:**
    * Clear display of snippet title, C++ code, and creation/update dates.
    * Detailed explanation section: logic, use cases, and time/space complexity (with basic math notation rendering).
    * "Copy to Clipboard" button for easy code copying.
    * Clickable tags to quickly filter related snippets.

## 🛠️ Tech Stack

* **Frontend:** React (using standalone UMD builds with Babel for JSX transpilation in the browser)
* **Styling:** Tailwind CSS (CDN)
* **Syntax Highlighting:** Prism.js (CDN) with Okaidia theme and line numbers plugin.
* **Fonts:** Google Fonts (Inter for general text, Fira Code/JetBrains Mono/Ubuntu Mono for code).

## 💬 Language

Currently, detailed explanations of each algorithm are written in Vietnamese, everything else is in English.

## 📂 Project Structure

The project is structured for clarity and ease of management, especially for a standalone setup

## 📄 LICENSE

Published under [MIT License](./LICENSE).  