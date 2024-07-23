import Input from "./Input";
export default function UserInputs({ onChange, userInput }) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } =
        userInput;
    return (
        <div id="user-input">
            <div className="input-group">
                <Input
                    label="Initial Investment"
                    value={initialInvestment}
                    onChange={(e) =>
                        onChange("initialInvestment", e.target.value)
                    }
                />
                <Input
                    label="Annual Investment"
                    value={annualInvestment}
                    onChange={(e) =>
                        onChange("annualInvestment", e.target.value)
                    }
                />
            </div>
            <div className="input-group">
                <Input
                    label="Expected Return"
                    value={expectedReturn}
                    onChange={(e) => onChange("expectedReturn", e.target.value)}
                />
                <Input
                    label="Duration"
                    value={duration}
                    onChange={(e) => onChange("duration", e.target.value)}
                />
            </div>
        </div>
    );
}
