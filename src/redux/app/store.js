import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
