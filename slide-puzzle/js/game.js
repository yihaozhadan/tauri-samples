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
        this.initializeGame();
    }

    initializeGame() {
        this.isGameWon = false;
        this.winMessageElement.style.display = 'none';
        // Initialize board with numbers 1-8 and one empty tile (0)
        this.board = Array.from({length: this.size * this.size - 1}, (_, i) => i + 1);
        this.board.push(0); // Add the empty tile
        
        this.shuffleBoard();
        this.renderBoard();
        this.updateMovesDisplay();
        this.setupEventListeners();
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
        // Check first row: 1, 2, 3
        if (this.board[0] !== 1 || this.board[1] !== 2 || this.board[2] !== 3) return false;
        
        // Check second row: 4, 5, 6
        if (this.board[3] !== 4 || this.board[4] !== 5 || this.board[5] !== 6) return false;
        
        // Check third row: 7, 8, empty(0)
        if (this.board[6] !== 7 || this.board[7] !== 8 || this.board[8] !== 0) return false;
        
        return true;
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
        this.newGameButton.addEventListener('click', () => {
            this.initializeGame();
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SlidePuzzle();
});
