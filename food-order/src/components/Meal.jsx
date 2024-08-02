import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "../stores/cart";
export default function Meal({ meal }) {
    const { addItemToCart } = useContext(CartContext);
    const { name, description, price, image } = meal;
    const host = "http://localhost:3000";
    const addedMeal = { ...meal, quantity: 1 };
    return (
        <div className="meal-item">
            <article>
                <img src={`${host}/${image}`} alt={description} />
                <h3>{name}</h3>
                <p className="meal-item-price">{price}</p>
                <p className="meal-item-description">{description}</p>
                <Button onClick={() => addItemToCart(addedMeal)}>
                    Add to Cart
                </Button>
            </article>
        </div>
    );
}
