import Button from "./Button";
import Input from "./Input";
import { useInput } from "../hooks/useInput";
import { hasValue, isEmail } from "../validation";
import { postOrder } from "../http";
import { CartContext } from "../stores/cart";
import { useContext, useState } from "react";
import { ModalContext } from "../stores/modal";
import Modal from "./Modal";

export default function OrderForm() {
    const [isCompleted, setIsCompleted] = useState(false);
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const { closeOrder, openOrder } = useContext(ModalContext);
    const {
        value: name,
        handleChange: nameChange,
        handleBlur: nameBlur,
        handleFocus: nameFocus,
        hasError: nameError,
    } = useInput("", (name) => hasValue(name));

    const {
        value: email,
        handleChange: emailChange,
        handleBlur: emailBlur,
        handleFocus: emailFocus,
        hasError: emailError,
    } = useInput("", (email) => hasValue(email) && isEmail(email));

    const {
        value: street,
        handleChange: streetChange,
        handleBlur: streetBlur,
        handleFocus: streetFocus,
        hasError: streetError,
    } = useInput("", (street) => hasValue(street));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nameError && !emailError && !streetError) {
            const submitedData = {
                customer: {
                    name,
                    email,
                    street,
                    "postal-code": "12345",
                    city: "New York",
                },
                totalPrice,
                items: cart,
            };
            try {
                const res = await postOrder(submitedData);
                if (!res.ok) {
                    throw new Error("Order could not be placed");
                }
            } catch (error) {
                console.error(error);
            }
            setIsCompleted(true);
        }
    };
    const confirmOrder = () => {
        clearCart();
        closeOrder();
        setIsCompleted(false);
    };
    return (
        <Modal open={openOrder}>
            {!isCompleted && (
                <form onSubmit={handleSubmit} tabIndex="-1">
                    <h2>Checkout</h2>
                    <p>Total Amount: $ {totalPrice}</p>
                    <Input
                        label="Full Name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={nameChange}
                        onBlur={nameBlur}
                        onFocus={nameFocus}
                        required
                    />
                    {nameError && (
                        <p style={{ color: "red" }}>Name is required</p>
                    )}
                    <Input
                        label="E-mail Address"
                        type="email"
                        id="email"
                        value={email}
                        onChange={emailChange}
                        onBlur={emailBlur}
                        onFocus={emailFocus}
                        required
                    />
                    {emailError && (
                        <p style={{ color: "red" }}>
                            Email is required and must be email format
                        </p>
                    )}
                    <Input
                        label="Street"
                        type="text"
                        id="street"
                        value={street}
                        onChange={streetChange}
                        onBlur={streetBlur}
                        onFocus={streetFocus}
                        required
                    />
                    {streetError && (
                        <p style={{ color: "red" }}>Street is required</p>
                    )}
                    <div className="control-row">
                        <Input
                            label="Postal Code"
                            type="text"
                            id="code"
                            required
                        />
                        <Input label="City" type="text" id="city" required />
                    </div>
                    <div className="modal-actions">
                        <Button textBtn type="button" onClick={closeOrder}>
                            Close
                        </Button>
                        <Button>Submit Order</Button>
                    </div>
                </form>
            )}
            {isCompleted && (
                <div>
                    <h2>Success!</h2>
                    <p>Thank you for your order!</p>
                    <Button onClick={confirmOrder}>Okay</Button>
                </div>
            )}
        </Modal>
    );
}
