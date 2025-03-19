document.getElementById("submit").addEventListener("click", function() {
    player1Name = document.getElementById("player1").value.trim();
    player2Name = document.getElementById("player2").value.trim();

    if (player1Name === "" || player2Name === "") {
        alert("Please enter names for both players.");
        return;
    }

    document.querySelector(".message").textContent = `${player1Name}, you're up!`;
    document.getElementById("game-board").classList.remove("hidden");
    document.querySelector(".container").classList.add("hidden");

    startGame();
});

let currentPlayer = "X";
let cells = document.querySelectorAll(".cell");
let player1Name = "";
let player2Name = "";

function startGame() {
    cells.forEach(cell => {
        cell.textContent = "";  // Clear board
        cell.addEventListener("click", handleCellClick);
    });

    document.getElementById("restart").classList.add("hidden");

    // Set initial turn message
    document.getElementById("turn-indicator").textContent = `${player1Name}, you're up!`;
}

function handleCellClick(event) {
    const cell = event.target;

    if (cell.textContent !== "") return; // Prevent overwriting moves

    cell.textContent = currentPlayer;

    if (checkWinner()) {
        let winnerName = currentPlayer === "X" ? player1Name : player2Name;
        document.querySelector(".message").textContent = `${winnerName}, congratulations you won!`;
        setTimeout(() => alert(`${winnerName}, congratulations you won!`), 100);
        endGame();
        return;
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        document.querySelector(".message").textContent = "It's a draw!";
        setTimeout(() => alert("It's a draw!"), 100);
        endGame();
        return;
    }

    // Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    let nextPlayerName = currentPlayer === "X" ? player1Name : player2Name;

    // Update turn message
    document.getElementById("turn-indicator").textContent = `${nextPlayerName}, you're up!`;
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombos.some(combo => {
        return cells[combo[0]].textContent !== "" &&
               cells[combo[0]].textContent === cells[combo[1]].textContent &&
               cells[combo[1]].textContent === cells[combo[2]].textContent;
    });
}

function endGame() {
    cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
    document.getElementById("restart").classList.remove("hidden");
}

document.getElementById("restart").addEventListener("click", function() {
    currentPlayer = "X";
    startGame();
    document.getElementById("turn-indicator").textContent = `${player1Name}, you're up!`;
});
