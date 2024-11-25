# Markdown Editor

A modern, desktop markdown editor built with Tauri 2.0 and React. Simple, fast, and efficient for your markdown editing needs.

## Features

- **Real-time Preview**
  - Side-by-side live preview
  - Toggle between edit, preview, and split modes
  - Instant rendering of markdown syntax

- **Rich Text Editing**
  - Support for all common markdown syntax
  - Quick formatting toolbar
  - Code block support
  - Lists (ordered, unordered, and task lists)
  - Block quotes
  - Horizontal rules

- **File Operations**
  - Open markdown files (⌘O / Ctrl+O)
  - Save markdown files (⌘S / Ctrl+S)
  - File type filtering for .md files

- **Modern Interface**
  - Clean, distraction-free design
  - Full-screen editing mode
  - Customizable toolbar
  - Dark mode support
  - Responsive layout

## Development

### Prerequisites

- Node.js (v18 or later)
- Rust (latest stable)
- Tauri CLI (`cargo install tauri-cli`)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd markdown-editor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run tauri dev
```

### Building

To create a production build:

```bash
npm run tauri build
```

This will create platform-specific installers in the `src-tauri/target/release/bundle` directory.

## Tech Stack

- **Frontend**
  - React
  - @uiw/react-md-editor
  - CSS Modules

- **Backend**
  - Tauri 2.0
  - Rust

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License. See [LICENSE](LICENSE) for more information.
