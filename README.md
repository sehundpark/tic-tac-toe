# Tic-Tac-Toe

A classic Tic-Tac-Toe game implemented with HTML, CSS, and JavaScript. This project features a clean user interface, customizable player names and symbols, and a responsive design.

## Live Demo

Play the game here: [Tic-Tac-Toe Demo](https://sehundpark.github.io/tic-tac-toe/)

## Features

- Customizable player names and symbols
- Interactive game board with hover effects
- Win detection and tie game recognition
- Popup notifications for game results
- Option to restart the game
- Responsive design for various screen sizes

## How to Play

1. Enter the names for Player 1 and Player 2 (optional).
2. Choose symbols for each player (default is X and O).
3. Click "Start Game" to begin.
4. Players take turns clicking on empty cells to place their symbol.
5. The game ends when a player gets three in a row or when all cells are filled.
6. Click "Restart Game" to play again.

## Project Structure

- `index.html`: The main HTML structure of the game.
- `styles.css`: CSS file for styling the game interface.
- `script.js`: JavaScript file containing game logic and DOM manipulation.

## Technical Implementation

The game is built using the module pattern to organize code:

- `Gameboard`: Manages the game board state.
- `Player`: Factory function for creating player objects.
- `GameController`: Handles game flow and win condition checks.
- `DisplayController`: Manages the UI and user interactions.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/sehundpark/tic-tac-toe/issues) if you want to contribute.

## License

This project is open source and available under the [MIT License](LICENSE).
