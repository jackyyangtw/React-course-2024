import Logo from "../assets/investment-calculator-logo.png";
export default function Header() {
    return (
        <header id="header">
            <img src={Logo} alt="logo" />
            <h1>React Investment Calculator</h1>
        </header>
    );
}
