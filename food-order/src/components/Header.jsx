import logo from "../assets/logo.jpg";
import Button from "./Button";
import { ModalContext } from "../stores/modal";
import { CartContext } from "../stores/cart";
import { useContext } from "react";
export default function Header() {
    const { cart } = useContext(CartContext);
    const { handleOpenCart } = useContext(ModalContext);
    const itemAmount = cart.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <>
            <header id="main-header">
                <div id="title">
                    <h1>REACTFOOD</h1>
                    <img src={logo} alt="logo" />
                </div>
                <Button onClick={handleOpenCart}>Cart({itemAmount})</Button>
            </header>
        </>
    );
}
