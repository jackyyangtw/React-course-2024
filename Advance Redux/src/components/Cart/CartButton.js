import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../stores/ui-slice";
import { cartActions } from "../../stores/cart-slice";

const CartButton = (props) => {
    const dispatch = useDispatch();
    const { toggle } = uiActions;
    const toggleCartHandler = () => {
        dispatch(toggle());
    };
    const cartQuantity = useSelector((state) => state.cart.totalQuantity);
    return (
        <button className={classes.button} onClick={toggleCartHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{cartQuantity}</span>
        </button>
    );
};

export default CartButton;
