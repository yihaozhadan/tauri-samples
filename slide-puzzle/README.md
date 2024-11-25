# Slide Puzzle Game

A classic sliding puzzle game built with Tauri 2.0, featuring multiple difficulty levels and a clean, modern interface.

## Features

- 🎮 Multiple difficulty levels:
  - Easy: 3×3 grid (8 tiles)
  - Medium: 4×4 grid (15 tiles)
  - Hard: 5×5 grid (24 tiles)
- 🎯 Intuitive gameplay with click-based tile movement
- 🔄 Dynamic board resizing
- 📊 Move counter to track progress
- 🎉 Win detection and celebration
- 💡 Interactive help system
- 🎨 Clean, modern UI design

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yihaozhadan/tauri-samples.git
cd slide-puzzle
```

2. Install dependencies:
```bash
npm install
```

3. Run the development version:
```bash
npm run tauri dev
```

4. Build for production:
```bash
npm run tauri build
```

## How to Play

1. Choose a difficulty level from the dropdown menu
2. Click "New Game" to start a fresh game
3. Click on any tile adjacent to the empty space to move it
4. Arrange the numbers in ascending order with the empty space at the end
5. Track your progress with the moves counter
6. Click "Show Help" anytime to view the game instructions

## Development

The project is structured as follows:

- `src-tauri/`: Rust backend code
- `index.html`: Main game interface
- `js/game.js`: Game logic implementation
- `styles/`: CSS styling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
