# WebIn: Your Ultimate New Tab Dashboard 🚀

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)
![Repo Size](https://img.shields.io/github/repo-size/avdeshjadon-dev/WebIn)
![Last Commit](https://img.shields.io/github/last-commit/avdeshjadon-dev/WebIn)

**WebIn** is a powerful, lightweight browser extension that transforms your new tab into a sleek, organized, and fully customizable dashboard. It's designed for productivity, allowing you to access all your favorite websites and tools from a single, beautiful interface without the clutter of traditional bookmarks.

---

## 🎥 Live View

![WebIn Live Demo](https://i.imgur.com/JGO7lsw.png)

---

## ✨ Key Features

* **Smart Categorization:** Group your links into custom tabs like "Coding," "Social," "AI Tools," or anything you need for your workflow.
* **Dynamic Grid Layout:** A clean, modern grid displays your apps with their favicons for quick visual recognition.
* **Complete Customization:**
    * **Add/Delete Categories:** Tailor the navigation tabs to match your projects and interests.
    * **Add/Edit/Delete Apps:** Easily manage the links within each category on the fly.
* **Blazing-Fast Universal Search:** Instantly find any app across all categories with a powerful, real-time search bar.
* **Draggable & Resizable UI:** Reposition and resize the hub window to fit your screen and workflow perfectly. It remembers its state.
* **Persistent Local Storage:** Your entire custom layout is securely saved locally using the `chrome.storage.local` API.
* **Conflict-Free & Secure:** Built with a **Shadow DOM** to ensure the extension's styles and scripts never conflict with any website you visit.
* **Lightweight & Performant:** Optimized for speed with no external libraries or dependencies, ensuring a smooth experience.
* **One-Click Reset:** Easily revert to the default configuration anytime.

---

## 🛠️ Technology Stack

* **Core:** `JavaScript (ES6+)`, `HTML5`, `CSS3`
* **APIs:** `Chrome Extension APIs` (Manifest V3)
    * `chrome.storage` for data persistence.
    * `chrome.runtime` for communication between scripts.
    * `chrome.action` for toolbar functionality.

---

## 📁 Folder Structure

The repository is organized to be clean and maintainable, following standard practices for browser extension development.
```
WebIn/
├── images/
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-96.png
├── .gitignore
├── background.js
├── inject.js
└── manifest.json
└── readme.md

```
| File / Folder   | Description                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `images/`       | Contains all the static icons used for the extension's branding in the browser toolbar and extensions menu.                                |
| `.gitignore`    | Specifies which files and directories should be ignored by Git (e.g., `node_modules`, system files).                                       |
| `background.js` | The service worker for the extension. It runs in the background to handle events and long-running tasks, like fetching favicons.           |
| `inject.js`     | The main content script. This file contains all the logic for creating, managing, and displaying the WebIn user interface on the page.     |
| `manifest.json` | The core configuration file for the Chrome extension. It defines permissions, scripts, icons, and other essential metadata.                |
| `readme.md`     | You are here! This file.                                                                                                                   |

---

## 🚀 Getting Started

You can get WebIn up and running in two ways: by cloning the repository (for developers) or by loading the unpacked extension (for users).

### 1. For Developers (Cloning the Repo)

This method is recommended if you want to contribute to the project or explore the code.

1.  **Clone the repository:** Open your terminal and run the following command:
    ```sh
    git clone [https://github.com/avdeshjadon-dev/WebIn.git](https://github.com/avdeshjadon-dev/WebIn.git)
    ```
2.  **Navigate to the directory:**
    ```sh
    cd WebIn
    ```
3.  **Load the extension in Chrome:**
    * Open Google Chrome and navigate to `chrome://extensions`.
    * Enable **"Developer mode"** using the toggle in the top-right corner.
    * Click the **"Load unpacked"** button.
    * Select the `WebIn` folder that you just cloned.

### 2. For General Users (Recommended)

This is the simplest way to install and use the extension.

1.  **Download the ZIP file:** Go to the [Releases page](https://github.com/avdeshjadon-dev/WebIn/releases) of this repository and download the latest `.zip` file.
2.  **Unzip the file:** Extract the contents of the ZIP file into a permanent folder on your computer.
3.  **Load the extension in Chrome:**
    * Open Google Chrome and navigate to `chrome://extensions`.
    * Enable **"Developer mode"** using the toggle in the top-right corner.
    * Click the **"Load unpacked"** button.
    * Select the folder where you extracted the files.

The WebIn icon will now appear in your browser's toolbar. You're all set!

---

## ⚙️ Architectural Overview

WebIn is built with a clear separation of concerns to ensure it is robust and easy to maintain.

### 1. `manifest.json`
This is the heart of the extension. It uses Manifest V3 and defines:
* **`permissions`**: Requests access to `storage` (to save user data) and `scripting` (to inject the UI).
* **`background`**: Registers `background.js` as the service worker.
* **`action`**: Defines the toolbar icon and enables the extension to be triggered by a user click.
* **`host_permissions`**: Although not strictly necessary for this logic to run on an active tab click, it's good practice for future features.

### 2. `background.js` (Service Worker)
The background script is an event-based service worker. Its primary responsibility is to handle tasks that don't require a visible UI.
* **Icon Fetching:** It listens for messages from `inject.js` requesting a favicon. To avoid CORS issues and get a clean, usable image, it fetches the icon URL and converts it to a `base64` data URL, which is then sent back to the content script.

### 3. `inject.js` (UI & Core Logic)
This is the largest and most critical file. It's injected into the active tab when the user clicks the extension icon. The entire script is wrapped in an **IIFE (Immediately Invoked Function Expression)** to prevent any variable leakage into the global scope of the web page.

* **State Management:**
    * Two variables, `tabs` and `tabContent`, hold the entire state of the application.
    * `saveState()` and `initializeApp()` functions handle the serialization/deserialization of this state to and from `chrome.storage.local`.

* **UI Construction (`buildUI`)**:
    * **Shadow DOM:** The entire UI is rendered inside a Shadow DOM to guarantee that no CSS from the host page can affect the extension, and vice-versa. This is critical for consistent behavior across all websites.
    * **Programmatic Element Creation:** Every single UI element is created and configured dynamically using JavaScript. This provides full control over the structure and behavior of the application without needing a separate HTML file.

* **Event Handling:**
    * **Drag & Resize:** Listeners are attached to the header and resizer handle to allow the user to move and resize the main window. The position and size are not currently saved but could be a future enhancement.
    * **User Actions:** All clicks on tabs, cards, search, and action buttons (`Add`, `Delete`, `Reset`) are handled with dedicated event listeners that update the state and re-render the UI as needed.

* **Modals:** A flexible `showModal()` system is used to generate different types of dialogs (confirm, prompt, edit forms) dynamically, improving code reuse and user experience.

---

## 🤝 Contributing

Contributions are welcome! If you have an idea for a new feature or have found a bug, please feel free to contribute.

1.  **Fork the repository** by clicking the "Fork" button in the top-right.
2.  **Clone your forked repository:** `git clone https://github.com/YourUsername/WebIn.git`
3.  **Create a new branch:** `git checkout -b feature/YourAmazingFeature`
4.  **Make your changes** and commit them with a descriptive message.
5.  **Push to your branch:** `git push origin feature/YourAmazingFeature`
6.  **Open a Pull Request** back to the main `avdeshjadon-dev/WebIn` repository.

If you find any issues, please [report them here](https://github.com/avdeshjadon-dev/WebIn/issues).

---

## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

## 👤 Author

Crafted with ❤️ by **Avdesh Jadon**.

* **GitHub:** [@avdeshjadon-dev](https://github.com/avdeshjadon-dev)
