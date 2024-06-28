// Module for the Gameboard
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMark = (index, symbol) => {
        if (board[index] === "") {
            board[index] = symbol;
        }
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {getBoard, placeMark, resetBoard};
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
};

// Module for the Game Controller
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameActive = true;

    const startNewGame = (player1Name, player1Symbol, player2Name, player2Symbol) => {
        players = [
            Player(player1Name, player1Symbol),
            Player(player2Name, player2Symbol)
        ];
        currentPlayerIndex = 0;
        Gameboard.resetBoard();
        gameActive = true;
        DisplayController.renderBoard();
        DisplayController.showResult(''); // Clear previous result
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const playRound = (index) => {
        if (!gameActive || Gameboard.getBoard()[index] !== "") {
            return;
        }
        Gameboard.placeMark(index, getCurrentPlayer().getSymbol());
        if (checkWinner()) {
            gameActive = false;
            DisplayController.showResult(`${getCurrentPlayer().getName()} wins!`);
        } else if (Gameboard.getBoard().every(cell => cell !== "")) {
            gameActive = false;
            DisplayController.showResult("It's a tie!");
        } else {
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        }
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
            // checks symbol exists at board[a] and is the same at index b and c
        });
    };

    return {startNewGame, getCurrentPlayer, playRound};
})();

// Module for the Display Controller
const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const resultDisplay = document.getElementById("result");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const player1SymbolInput = document.getElementById("player1Symbol");
    const player2SymbolInput = document.getElementById("player2Symbol");
    const startButton = document.getElementById("startButton");
    const controlsContainer = document.querySelector(".controls-container");
    const boardContainer = document.querySelector(".board-container");
    const popup = document.getElementById("popup");
    const popupResult = document.getElementById("popupResult");
    const restartButton = document.getElementById("restartButton");

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
            cell.classList.remove('hover-x', 'hover-o'); // Clear hover classes
            cell.removeEventListener('click', handleCellClick); // Ensure no duplicate listeners
            cell.addEventListener('click', () => handleCellClick(index));
            cell.removeEventListener('mouseover', handleMouseOver); // Ensure no duplicate listeners
            cell.addEventListener('mouseover', () => handleMouseOver(index));
            cell.removeEventListener('mouseout', handleMouseOut); // Ensure no duplicate listeners
            cell.addEventListener('mouseout', handleMouseOut);
        });
    };

    const handleCellClick = (index) => {
        GameController.playRound(index);
        renderBoard();
    };

    const handleMouseOver = (index) => {
        if (Gameboard.getBoard()[index] === "") { // Only show hover effect on empty cells
            const currentPlayer = GameController.getCurrentPlayer();
            cells[index].classList.add(currentPlayer.getSymbol() === "X" ? 'hover-x' : 'hover-o');
            cells[index].textContent = currentPlayer.getSymbol();
        }
    };

    const handleMouseOut = (event) => {
        const index = event.target.dataset.index;
        if (Gameboard.getBoard()[index] === "") { // Only remove hover effect on empty cells
            cells[index].classList.remove('hover-x', 'hover-o');
            cells[index].textContent = "";
        }
    };

    const showResult = (result) => {
        resultDisplay.textContent = result;
        popupResult.textContent = result;
        if (result) { // Show popup only if there's a result
            popup.style.display = "flex"; // Show popup with flex display
        } else {
            popup.style.display = "none"; // Ensure popup is hidden if there's no result
        }
    };

    const hidePopup = () => {
        popup.style.display = "none"; // Hide popup
    };

    const restartGame = () => {
        hidePopup();
        GameController.startNewGame(
            player1Input.value || "Player 1",
            player1SymbolInput.value || "X",
            player2Input.value || "Player 2",
            player2SymbolInput.value || "O"
        );
        renderBoard();
    };

    const startGame = () => {
        const player1Name = player1Input.value || "Player 1";
        const player2Name = player2Input.value || "Player 2";
        const player1Symbol = player1SymbolInput.value || "X";
        const player2Symbol = player2SymbolInput.value || "O";
        if (player1Symbol === player2Symbol) {
            alert("Players cannot have the same symbol. Please choose different symbols.");
            return;
        }
        controlsContainer.style.display = "none";
        boardContainer.style.display = "block";
        GameController.startNewGame(player1Name, player1Symbol, player2Name, player2Symbol);
        hidePopup(); // Ensure the popup is hidden when starting a new game
    };

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);

    return {renderBoard, showResult};
})();

// Start the game by hiding the board initially
document.addEventListener("DOMContentLoaded", () => {
    const boardContainer = document.querySelector(".board-container");
    boardContainer.style.display = "none";
});
