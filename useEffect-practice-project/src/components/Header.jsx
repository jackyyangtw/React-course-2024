import logoImage from "../assets/quiz-logo.png";

export default function Header() {
    return (
        <header>
            <img src={logoImage} alt="" />
            <h1>REACTQUIZ</h1>
        </header>
    );
}
