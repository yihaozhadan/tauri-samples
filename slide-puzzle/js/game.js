class SlidePuzzle {
    constructor() {
        this.board = [];
        this.emptyTile = { row: 2, col: 2 }; // Bottom-right corner
        this.size = 3;
        this.moves = 0;
        this.boardElement = document.getElementById('puzzle-board');
        this.newGameButton = document.getElementById('new-game');
        this.initializeGame();
    }

    initializeGame() {
        // Initialize the board with numbers 1-8 and empty tile
        this.board = Array.from({ length: this.size }, (_, i) =>
            Array.from({ length: this.size }, (_, j) => {
                const value = i * this.size + j + 1;
                return value === 9 ? null : value;
            })
        );
        
        this.shuffleBoard();
        this.renderBoard();
        this.setupEventListeners();
    }

    shuffleBoard() {
        // Perform 1000 random valid moves to shuffle the board
        for (let i = 0; i < 1000; i++) {
            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.moveTile(randomMove.row, randomMove.col, false);
        }
        this.moves = 0;
    }

    getPossibleMoves() {
        const moves = [];
        const { row, col } = this.emptyTile;
        
        // Check all adjacent tiles
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            if (this.isValidPosition(newRow, newCol)) {
                moves.push({ row: newRow, col: newCol });
            }
        }
        return moves;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    moveTile(row, col, countMove = true) {
        if (!this.isValidMove(row, col)) return;

        // Swap the tile with empty tile
        const temp = this.board[row][col];
        this.board[row][col] = null;
        this.board[this.emptyTile.row][this.emptyTile.col] = temp;
        
        // Update empty tile position
        this.emptyTile = { row, col };
        
        if (countMove) {
            this.moves++;
            if (this.checkWin()) {
                setTimeout(() => {
                    alert(`Congratulations! You solved the puzzle in ${this.moves} moves!`);
                }, 100);
            }
        }
        
        this.renderBoard();
    }

    isValidMove(row, col) {
        return Math.abs(row - this.emptyTile.row) + Math.abs(col - this.emptyTile.col) === 1;
    }

    checkWin() {
        let value = 1;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (i === this.size - 1 && j === this.size - 1) {
                    if (this.board[i][j] !== null) return false;
                } else if (this.board[i][j] !== value) {
                    return false;
                }
                value++;
            }
        }
        return true;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const tile = document.createElement('div');
                const value = this.board[i][j];
                
                tile.className = value === null ? 'tile empty' : 'tile';
                if (value !== null) {
                    tile.textContent = value;
                    tile.addEventListener('click', () => this.moveTile(i, j));
                }
                
                this.boardElement.appendChild(tile);
            }
        }
    }

    setupEventListeners() {
        this.newGameButton.addEventListener('click', () => {
            this.initializeGame();
        });
    }
}

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new SlidePuzzle();
});
