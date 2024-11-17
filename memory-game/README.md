# Memory Game - Tauri + Svelte + TypeScript

A cross-platform desktop memory card game built with Tauri, Svelte, and TypeScript. Test and improve your memory by matching pairs of cards!

## Features

- Classic memory card matching gameplay
- Beautiful and responsive UI
- Cross-platform desktop support (macOS, Windows, Linux)
- Built with modern web technologies

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Rust](https://www.rust-lang.org/) (latest stable)
- [VS Code](https://code.visualstudio.com/) (recommended)

### Recommended IDE Extensions

- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development mode:
   ```bash
   npm run tauri dev
   ```
4. Build for production:
   ```bash
   npm run tauri build
   ```

## License

MIT

## Getting Started

Run `npm run dev` to start the development server. It will watch the source code, compile it into binary, and serve it at `http://localhost:1420`. The Svelte app will be available at `http://localhost:1420/src/App.svelte`.

Once you've edited the file, save it to see the Svelte reload the page.

To learn more about Tauri, visit the [Tauri documentation](https://tauri.app).