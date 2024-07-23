import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Results({ userInput }) {
    const results = calculateInvestmentResults(userInput);
    const { valueEndOfYear, interest, annualInvestment } = results[0];
    const initialInvestment = valueEndOfYear - interest - annualInvestment;
    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment value</th>
                    <th>Interest(Year)</th>
                    <th>Total Interset</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {results.map(
                    ({ annualInvestment, year, interest, valueEndOfYear }) => {
                        const totalInterest =
                            valueEndOfYear -
                            annualInvestment * year -
                            initialInvestment;
                        const totalAmount = valueEndOfYear - totalInterest;
                        const FORMAT = (value) => formatter.format(value);
                        return (
                            <tr key={year}>
                                <td>{year}</td>
                                <td>{FORMAT(valueEndOfYear)}</td>
                                <td>{FORMAT(interest)}</td>
                                <td>{FORMAT(totalInterest)}</td>
                                <td>{FORMAT(totalAmount)}</td>
                            </tr>
                        );
                    }
                )}
            </tbody>
        </table>
    );
}
