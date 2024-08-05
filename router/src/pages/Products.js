import { Link } from "react-router-dom";
const PRODUCTS = [
    {
        id: "1",
        name: "Product 1",
        price: 100,
    },
    {
        id: "2",
        name: "Product 2",
        price: 200,
    },
    {
        id: "3",
        name: "Product 3",
        price: 300,
    },
];

export default function ProductsPage() {
    return (
        <>
            <h1>Products</h1>
            <ul>
                {PRODUCTS.map(({ name, id }) => (
                    <li key={id}>
                        <Link to={id} relative="path">
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
