import Header from "./components/Header";
import UserInputs from "./components/UserInputs";
import Results from "./components/Results";
import { useState } from "react";
function App() {
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    });
    const handleChange = (input, newVal) => {
        setUserInput((prev) => {
            return { ...prev, [input]: +newVal };
        });
    };
    const isInputValid = userInput.duration > 0;
    return (
        <>
            <Header></Header>
            <UserInputs
                userInput={userInput}
                onChange={handleChange}
            ></UserInputs>

            {!isInputValid && (
                <p className="center">Please input duration greater then 0</p>
            )}
            {isInputValid && <Results userInput={userInput}></Results>}
        </>
    );
}

export default App;
