import image from "../assets/react-core-concepts.png";
const getRandomInt = (max) => {
    return Math.floor(Math.random() * (max + 1));
};
const desc = [
    "React",
    "Essentials",
    "Fundamental React concepts you will need for almost any app you are going to build!",
];
export default function Header() {
    return (
        <header>
            <img src={image} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                {desc[getRandomInt(2)]} React concepts you will need for almost
                any app you are going to build!
            </p>
        </header>
    );
}
