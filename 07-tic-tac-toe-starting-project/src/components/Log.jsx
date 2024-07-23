export default function Log({ gameTurns }) {
    return (
        <ol id="log">
            {gameTurns.map(({ square, player }, index) => (
                <li className="highlighted" key={index}>
                    {`Player ${player} placed an ${player} in square (${
                        square.row + 1
                    }, ${square.col + 1})`}
                </li>
            ))}
        </ol>
    );
}
