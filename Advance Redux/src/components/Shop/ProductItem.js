import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../stores/cart-slice";
import { useDispatch } from "react-redux";
const ProductItem = ({ id, title, price, description }) => {
    const dispatch = useDispatch();
    const { addItem } = cartActions;
    const addToCartHandler = () => {
        const addedItem = {
            id,
            price,
            title,
        };
        console.log(addedItem);
        dispatch(addItem(addedItem));
    };
    return (
        <li className={classes.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={classes.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={classes.actions}>
                    <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
