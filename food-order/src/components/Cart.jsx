import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "../stores/cart";
import { ModalContext } from "../stores/modal";
import Modal from "./Modal";
export default function Cart() {
    const { cart, plusItem, removeItem, totalPrice } = useContext(CartContext);
    const { handleCloseCart, handleOpenOrder, openCart } =
        useContext(ModalContext);
    return (
        <Modal open={openCart}>
            <div className="cart">
                <h2>Your Cart</h2>
                {cart.length === 0 && <p>Your cart is empty</p>}
                <ul>
                    {cart.map(
                        (meal) =>
                            meal.quantity > 0 && (
                                <li className="cart-item" key={meal.id}>
                                    <p>
                                        {meal.name} - {meal.quantity} x $
                                        {meal.price}
                                    </p>
                                    <div className="cart-item-actions">
                                        <Button
                                            onClick={() => removeItem(meal)}
                                        >
                                            <p>-</p>
                                        </Button>
                                        <span>{meal.quantity}</span>
                                        <Button onClick={() => plusItem(meal)}>
                                            <p>+</p>
                                        </Button>
                                    </div>
                                </li>
                            )
                    )}
                </ul>
                <div className="cart-total">
                    <p>$ {totalPrice}</p>
                </div>
                <div className="modal-actions">
                    <Button textBtn onClick={handleCloseCart}>
                        Close
                    </Button>
                    <Button onClick={handleOpenOrder}>Go To Checkout</Button>
                </div>
            </div>
        </Modal>
    );
}
