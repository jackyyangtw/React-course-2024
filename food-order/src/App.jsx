import CartContextProvider from "./stores/cart";
import ModalContextProvider from "./stores/modal";

import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";

export default function App() {
    return (
        <ModalContextProvider>
            <CartContextProvider>
                <Header />
                <main>
                    <Meals />
                </main>
                <Cart />
                <OrderForm />
            </CartContextProvider>
        </ModalContextProvider>
    );
}
