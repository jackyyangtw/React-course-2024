import { Link, useNavigate } from "react-router-dom";
export default function HomePage() {
    const navigate = useNavigate();
    const navigateToProducts = () => {
        navigate("/products");
    };
    return (
        <>
            <div>
                <h1>Home</h1>
            </div>
            <div>
                <Link to="products">Products</Link>
                <button onClick={navigateToProducts}>Nav to /products</button>
            </div>
        </>
    );
}
