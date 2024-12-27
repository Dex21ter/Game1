function randomPick() {
    // Pause the game to allow the computer to pick
    isPauseGame = true;

    setTimeout(() => {
        let bestMove = findBestMove();
        if (bestMove !== -1) {
            updateCell(cells[bestMove], bestMove, player);
            if (!checkWinner()) {
                changePlayer();
                isPauseGame = false;
            }
        }
    }, 1000); // Delay Computer move by 1 second
}

function findBestMove() {
    let bestScore = -Infinity;
    let move = -1;

    // Check each cell
    for (let i = 0; i < inputCells.length; i++) {
        if (inputCells[i] === '') {
            // Simulate the move
            inputCells[i] = player;
            let score = minimax(inputCells, 0, false);
            inputCells[i] = ''; // Undo the move

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    if (checkWinnerAI(board, 'X')) return -10 + depth;
    if (checkWinnerAI(board, 'O')) return 10 - depth;
    if (board.every(cell => cell !== '')) return 0; // Draw

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O'; // AI's turn
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X'; // Player's turn
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinnerAI(board, currentPlayer) {
    return winConditions.some(condition =>
        condition.every(index => board[index] === currentPlayer)
    );
}
