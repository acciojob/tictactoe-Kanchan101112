const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const submitButton = document.getElementById('submit');
const gameBoard = document.getElementById('game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart'); // <-- added


let player1Name = '';
let player2Name = '';
let currentPlayer = 'X'; // Start with Player 1 (X)
const boardState = ['', '', '', '', '', '', '', '', '']; // 3x3 grid
let gameActive = false;

// Add event listener to the submit button
submitButton.addEventListener('click', function() {
    // Get the player names
    player1Name = player1Input.value.trim();
    player2Name = player2Input.value.trim();

    // Check if both players have entered their names
    if (player1Name && player2Name) {
        // Hide the input section
        document.querySelector('.container').style.display = 'none';
        // Show the game board
        gameBoard.classList.remove('hidden');
        // Update the message to show whose turn it is
        messageDiv.textContent = `${player1Name}, you're up!`;
        gameActive = true;
    } else {
        alert("Please enter names for both players.");
    }
});

cells.forEach((cell, index) => {
    cell.addEventListener('click', function() {
        //Check if the cell is already filled
        if (boardState[index] === '') {
            // Update the board state
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer; // Display the current player's symbol

            // Check for a win or a draw
           if (checkWin()) {
            const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
messageDiv.textContent = `${winnerName}, congratulations you won!`;
            gameActive = false;
            cells.forEach(cell => cell.style.pointerEvents = 'none');
            showRestartButton();
        } else if (!boardState.includes('')) {
            messageDiv.textContent = "It's a draw!";
            gameActive = false;
            showRestartButton();
			   
		   }else {
                // Switch players
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                messageDiv.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}, you're up!`;
            }
        }
    });
});

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}
// Restart game functions
function showRestartButton() {
    restartButton.classList.remove('hidden');
}

function hideRestartButton() {
    restartButton.classList.add('hidden');
}

restartButton.addEventListener('click', function() {
    // Reset board state
    for (let i = 0; i < boardState.length; i++) boardState[i] = '';
    // Clear UI
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    // Reset turn
    currentPlayer = 'X';
    gameActive = true;
    messageDiv.textContent = `${player1Name}, you're up!`;
    hideRestartButton();
});