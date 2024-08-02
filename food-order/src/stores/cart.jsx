import { createContext, useState } from "react";
export const CartContext = createContext({});

export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]);
    const totalPrice = cart
        .reduce((acc, meal) => {
            return acc + meal.price * meal.quantity;
        }, 0)
        .toFixed(2);
    const addItemToCart = (meal) => {
        setCart((prev) => {
            const existingMeal = prev.find((item) => item.id === meal.id);
            if (existingMeal) {
                return prev.map((item) =>
                    item.id === meal.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, meal];
        });
    };
    const plusItem = (meal) => {
        setCart((prev) => {
            return prev.map((item) =>
                item.id === meal.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        });
    };
    const removeItem = (meal) => {
        setCart((prev) => {
            if (meal.quantity === 1) {
                return prev.filter((item) => item.id !== meal.id);
            }
            return prev.map((item) =>
                item.id === meal.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };
    const clearCart = () => {
        setCart([]);
    };
    const value = {
        cart,
        totalPrice,
        addItemToCart,
        plusItem,
        removeItem,
        clearCart,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
