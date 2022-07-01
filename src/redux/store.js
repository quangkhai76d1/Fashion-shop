import { configureStore } from "@reduxjs/toolkit";
import ProductModalSilce from "./product-modal/ProductModalSilce";
import cartItemsSlice from "./shopping-cart/cartItemsSlice";

const store = configureStore({
  reducer: {
    cartItems: cartItemsSlice,
    productModal: ProductModalSilce,
  },
});

export default store;
