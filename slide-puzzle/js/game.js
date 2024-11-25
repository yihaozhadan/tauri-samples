class SlidePuzzle {
    constructor() {
        this.board = [];
        this.size = 3;
        this.moves = 0;
        this.isGameWon = false;
        this.boardElement = document.getElementById('puzzle-board');
        this.movesElement = document.getElementById('moves');
        this.winMessageElement = document.getElementById('win-message');
        this.newGameButton = document.getElementById('new-game');
        this.difficultySelect = document.getElementById('difficulty');
        this.helpButton = document.getElementById('help-button');
        this.instructions = document.getElementById('instructions');
        this.setupEventListeners();
        this.initializeGame();
    }

    initializeGame() {
        this.isGameWon = false;
        this.winMessageElement.style.display = 'none';
        this.size = parseInt(this.difficultySelect.value);
        this.moves = 0;
        
        // Initialize board with numbers 1 to size²-1 and one empty tile (0)
        this.board = Array.from({length: this.size * this.size - 1}, (_, i) => i + 1);
        this.board.push(0); // Add the empty tile
        
        this.updateBoardSize();
        this.shuffleBoard();
        this.renderBoard();
        this.updateMovesDisplay();
    }

    updateBoardSize() {
        this.boardElement.className = `puzzle-board size-${this.size}`;
    }

    getEmptyPosition() {
        const emptyIndex = this.board.indexOf(0);
        return {
            row: Math.floor(emptyIndex / this.size),
            col: emptyIndex % this.size
        };
    }

    getTilePosition(value) {
        const index = this.board.indexOf(value);
        return {
            row: Math.floor(index / this.size),
            col: index % this.size
        };
    }

    shuffleBoard() {
        // Perform 1000 random valid moves to shuffle the board
        for (let i = 0; i < 1000; i++) {
            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.moveTile(randomMove, false);
        }
        this.moves = 0;
        this.updateMovesDisplay();
    }

    getPossibleMoves() {
        const empty = this.getEmptyPosition();
        const moves = [];
        
        // Check all adjacent positions
        const directions = [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 },  // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }   // right
        ];

        for (const dir of directions) {
            const newRow = empty.row + dir.row;
            const newCol = empty.col + dir.col;
            
            if (newRow >= 0 && newRow < this.size && newCol >= 0 && newCol < this.size) {
                const value = this.board[newRow * this.size + newCol];
                moves.push(value);
            }
        }
        
        return moves;
    }

    isValidMove(value) {
        const possibleMoves = this.getPossibleMoves();
        return possibleMoves.includes(value);
    }

    moveTile(value, countMove = true) {
        if (this.isGameWon || !this.isValidMove(value)) return;

        const tilePos = this.getTilePosition(value);
        const emptyPos = this.getEmptyPosition();
        
        // Get the indices for swapping
        const tileIndex = tilePos.row * this.size + tilePos.col;
        const emptyIndex = emptyPos.row * this.size + emptyPos.col;
        
        // Swap the tile with empty space
        [this.board[tileIndex], this.board[emptyIndex]] = [this.board[emptyIndex], this.board[tileIndex]];
        
        if (countMove) {
            this.moves++;
            this.updateMovesDisplay();
            if (this.checkWin()) {
                this.isGameWon = true;
                this.winMessageElement.textContent = `Congratulations!`;
                this.winMessageElement.style.display = 'block';
            }
        }
        
        this.renderBoard();
    }

    checkWin() {
        // Check if all numbers are in order from 1 to size²-1 and empty tile at the end
        for (let i = 0; i < this.board.length - 1; i++) {
            if (this.board[i] !== i + 1) return false;
        }
        return this.board[this.board.length - 1] === 0;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const value = this.board[row * this.size + col];
                if (value !== 0) { // Don't create a tile for the empty space
                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    tile.textContent = value;
                    tile.style.gridRow = row + 1;
                    tile.style.gridColumn = col + 1;
                    
                    tile.addEventListener('click', () => {
                        this.moveTile(value);
                    });
                    
                    this.boardElement.appendChild(tile);
                }
            }
        }
    }

    updateMovesDisplay() {
        this.movesElement.textContent = this.moves;
    }

    setupEventListeners() {
        // Remove existing event listeners if any
        this.newGameButton.removeEventListener('click', this.handleNewGame);
        this.difficultySelect.removeEventListener('change', this.handleDifficultyChange);
        this.helpButton.removeEventListener('click', this.handleHelpToggle);

        // Add event listeners
        this.handleNewGame = () => this.initializeGame();
        this.handleDifficultyChange = () => this.initializeGame();
        this.handleHelpToggle = () => {
            const isVisible = this.instructions.style.display === 'block';
            this.instructions.style.display = isVisible ? 'none' : 'block';
            this.helpButton.textContent = isVisible ? 'Show Help' : 'Hide Help';
        };

        this.newGameButton.addEventListener('click', this.handleNewGame);
        this.difficultySelect.addEventListener('change', this.handleDifficultyChange);
        this.helpButton.addEventListener('click', this.handleHelpToggle);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SlidePuzzle();
});
