document.getElementById("submit").addEventListener("click", function() {
    let player1 = document.getElementById("player1").value.trim();
    let player2 = document.getElementById("player2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players!");
        return;
    }

    // Hide player input section
    document.querySelector(".container").style.display = "none";

    // Show the game board
    document.getElementById("game-board").classList.remove("hidden");

    // Set player names
    document.getElementById("turn-indicator").textContent = `${player1}'s Turn (X)`;

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
}

function handleCellClick(event) {
    const cell = event.target;

    if (cell.textContent !== "") return; // Prevent overwriting moves

    cell.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} congratulations you won!`), 100);
        endGame();
        return;
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        setTimeout(() => alert("It's a draw!"), 100);
        endGame();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("turn-indicator").textContent = 
        currentPlayer === "X" ? "Player 1's Turn (X)" : "Player 2's Turn (O)";
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
    document.getElementById("turn-indicator").textContent = "Player 1's Turn (X)";
});
