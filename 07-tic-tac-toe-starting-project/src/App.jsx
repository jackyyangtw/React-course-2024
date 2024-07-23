import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
const PLAYERS = {
    x: "Player 1",
    o: "Player 2",
};

const getActivePlayer = (gameTurns) => {
    let activePlayer = "x";
    if (gameTurns.length && gameTurns[0].player === "x") {
        activePlayer = "o";
    }
    return activePlayer;
};
const getWinner = (gameBoard, players) => {
    let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];
        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
            break;
        }
    }
    return winner;
};
const getGameBoard = (gameBoard, gameTurns) => {
    for (const turn of gameTurns) {
        const { player, square } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }
    return gameBoard;
};
function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const handlePlayerNameChange = (symbol, name) => {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: name,
            };
        });
    };
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = getActivePlayer(gameTurns);
    const gameBoard = getGameBoard(
        [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        gameTurns
    );
    const winner = getWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;
    const handleSelectSquare = (rowIndex, cellIndex) => {
        setGameTurns((prevGameTurns) => {
            const currentPlayer = getActivePlayer(prevGameTurns);
            const updatedTurn = [
                {
                    square: { row: rowIndex, col: cellIndex },
                    player: currentPlayer,
                },
                ...prevGameTurns,
            ];

            return updatedTurn;
        });
    };
    const resetGame = () => {
        setGameTurns([]);
    };
    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        name={players.x}
                        symbol="x"
                        isActive={activePlayer === "x"}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        name={players.o}
                        symbol="o"
                        isActive={activePlayer === "o"}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(hasDraw || winner) && (
                    <GameOver winner={winner} onRestart={resetGame} />
                )}
                <GameBoard
                    board={gameBoard}
                    onSelectSquare={handleSelectSquare}
                ></GameBoard>
                <Log gameTurns={gameTurns} />
            </div>
        </main>
    );
}

export default App;
