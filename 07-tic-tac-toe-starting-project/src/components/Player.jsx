import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
    const [editing, setEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    const handleSetEditing = () => {
        // setEditing(!editing); // This will not work as expected

        // get latest state value and then update it
        setEditing((editing) => !editing);
        if (!editing) return;
        onChangeName(symbol, playerName);
    };
    const handleChange = (event) => {
        setPlayerName(event.target.value);
    };
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {!editing && <span className="player-name">{playerName}</span>}
                {editing && (
                    <input
                        type="text"
                        required
                        value={playerName}
                        onChange={handleChange}
                    />
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleSetEditing}>
                {editing ? "Save" : "Edit"}
            </button>
        </li>
    );
}
