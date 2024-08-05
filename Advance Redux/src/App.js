import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./stores/cart-actions";
let isInitial = true;
function App() {
    const isCartVisible = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const notification = useSelector((state) => state.ui.notification);
    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    return (
        <>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                {isCartVisible && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
