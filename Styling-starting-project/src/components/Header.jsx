import logo from "../assets/logo.png";
import "./Header.css";
export default function Header() {
    return (
        <header className="flex flex-col items-center mt-8 mb-16">
            <img src={logo} alt="A canvas" />
            <h1 className="text-4xl font-semibold tracking-widest text-center uppercase text-amber-800 font-title">
                ReactArt
            </h1>
            <p className="text-4xl text-orange-700">
                A community of artists and art-lovers.
            </p>
        </header>
    );
}
