import { createContext, useState } from "react";

export const ModalContext = createContext();

export default function ModalContextProvider({ children }) {
    const [openCart, setOpenCart] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);

    const handleOpenCart = () => {
        setOpenCart((prev) => !prev);
    };
    const handleCloseCart = () => {
        setOpenCart(false);
    };
    const handleOpenOrder = () => {
        setOpenCart(false);
        setOpenOrder((prev) => !prev);
    };
    const closeOrder = () => {
        setOpenOrder(false);
    };

    const value = {
        handleOpenCart,
        handleCloseCart,
        handleOpenOrder,
        closeOrder,
        openCart,
        openOrder,
    };

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
}
