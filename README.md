# PDF Password Unlocker 🔓

A modern, fast, and secure web application to remove passwords from your PDF files directly in your browser.

> [!IMPORTANT]
> This is not a tool that will decrypt PDF without providing the password. This tool will simply clone the password-protected PDF into a password-less one.

## 🚀 Features

- **100% Private & Secure**: All decryption happens locally in your browser using WebAssembly. No files are ever uploaded to a server, ensuring your sensitive documents remain completely private.
- **Lightning Fast**: Powered by `qpdf.js` (a WebAssembly port of the robust `qpdf` C++ library) for near-instantaneous decryption.
- **Modern UI/UX**: Features a clean, responsive interface with intuitive drag-and-drop file upload.
- **Cross-Platform**: Works on any modern web browser (Windows, macOS, Linux, ChromeOS) without requiring you to install any command-line tools or dependencies.
- **Seamless Workflow**: Automatically downloads the unlocked, password-free PDF immediately upon successful decryption.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Modern CSS (Glassmorphism, CSS Variables, Responsive Design)
- **Icons**: Lucide React
- **Core Engine**: `qpdf.js` (WebAssembly)

## 💡 Motivation

This project was built to replace an old, Windows-only `.bat` script that required users to install the `qpdf` command-line tool. By moving the logic to the web using WebAssembly, the unlocking process becomes universally accessible, more user-friendly, and completely eliminates the need for manual dependency installations—all while maintaining the same level of security and privacy.

## 💻 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or download the project files.
2. **Navigate to the project directory**:
   ```bash
   cd PDFPasswordUnlocker
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173/` (or the port specified in your terminal).

### Building for Production

To create an optimized production build:
```bash
npm run build
```
You can then preview the built application using:
```bash
npm run preview
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-source and available for use and modification.
