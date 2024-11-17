# Calculator App

A modern, cross-platform calculator built with Tauri, Svelte, and TypeScript. This desktop application combines the power of Rust's performance with the elegance of Svelte's reactive UI framework.

## Features

- Clean, modern user interface
- Light and dark mode support
- Basic arithmetic operations
- Responsive design
- Cross-platform compatibility (macOS, Windows, Linux)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yihaozhadan/tauri-samples.git
cd calculator
```

2. Install dependencies
```bash
npm install
```

3. Run in development mode
```bash
npm run tauri dev
```

4. Build for production
```bash
npm run tauri build
```

## Development

This project uses:
- [Tauri](https://tauri.app/) for creating the desktop application
- [Svelte](https://svelte.dev/) for the UI framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Vite](https://vitejs.dev/) for frontend tooling

### Project Structure

```
calculator/
├── src/              # Frontend source files (Svelte)
├── src-tauri/        # Backend source files (Rust)
├── public/           # Static assets
└── dist/             # Build output
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Version History

- 0.2.0: UI improvements and bug fixes
  - Centered calculator in window
  - Fixed window resizing issues
  - Improved dark mode support
- 0.1.0: Initial release
  - Basic calculator functionality
  - Dark/light mode toggle
