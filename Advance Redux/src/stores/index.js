import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";
export default configureStore({
    reducer: { ui: uiSlice, cart: cartSlice },
});
