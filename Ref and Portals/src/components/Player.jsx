import { useState, useRef } from "react";
export default function Player() {
    const [name, setName] = useState("");
    const inputRef = useRef();
    const handleClick = () => {
        setName(inputRef.current.value);
        inputRef.current.value = "";
    };
    return (
        <section id="player">
            <h2>Welcome {name ?? "unknow"}</h2>
            <p>
                <input ref={inputRef} type="text" />
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}
