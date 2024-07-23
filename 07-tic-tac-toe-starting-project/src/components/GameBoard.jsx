export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, cellIndex) => (
                            <li key={cellIndex}>
                                <button
                                    disabled={playerSymbol}
                                    onClick={() =>
                                        onSelectSquare(rowIndex, cellIndex)
                                    }
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
