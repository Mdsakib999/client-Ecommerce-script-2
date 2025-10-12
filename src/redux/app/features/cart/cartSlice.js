// redux/app/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // each item: full product fields + cartQuantity + totalPrice + outOfStock
  totalQuantity: 0, // sum of cartQuantity
  totalPrice: 0, // sum of effectivePrice * cartQuantity
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);
      const priceToUse = product.discountPrice ?? product.price;

      if (existingItem) {
        if (existingItem.cartQuantity < product.quantity) {
          existingItem.cartQuantity += 1;
          existingItem.totalPrice += priceToUse;
          existingItem.outOfStock = false;
        } else {
          existingItem.outOfStock = true;
        }
      } else {
        state.items.push({
          ...product,
          cartQuantity: 1,
          totalPrice: priceToUse,
          outOfStock: false,
        });
      }

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + (item.cartQuantity ?? 0),
        0
      );

      state.totalPrice = state.items.reduce(
        (sum, item) =>
          sum + (item.discountPrice ?? item.price) * (item.cartQuantity ?? 0),
        0
      );
    },

    removeFromCart: (state, action) => {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (existingItem) {
        // remove item and recalc totals
        state.items = state.items.filter((item) => item._id !== _id);
      }

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + (item.cartQuantity ?? 0),
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) =>
          sum + (item.discountPrice ?? item.price) * (item.cartQuantity ?? 0),
        0
      );
    },

    /**
     * payload: { productId, delta, stockLimit? }
     * delta is +1 or -1 (or any integer)
     */
    updateQuantity: (state, action) => {
      const { productId, delta = 0, stockLimit } = action.payload;
      const existingItem = state.items.find((it) => it._id === productId);

      if (!existingItem) return;

      // Use stockLimit if provided, otherwise fall back to existingItem.quantity (original stock)
      const limit =
        typeof stockLimit === "number" ? stockLimit : existingItem.quantity;

      existingItem.cartQuantity = (existingItem.cartQuantity ?? 0) + delta;

      // clamp to [1, limit]
      if (existingItem.cartQuantity <= 0) {
        // remove item
        state.items = state.items.filter((it) => it._id !== productId);
      } else if (existingItem.cartQuantity >= limit) {
        existingItem.cartQuantity = limit;
        existingItem.outOfStock = true;
      } else {
        existingItem.outOfStock = false;
      }

      // recalc each item's totalPrice (use effective price)
      state.items.forEach((it) => {
        const price = it.discountPrice ?? it.price;
        it.totalPrice = price * (it.cartQuantity ?? 0);
      });

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + (item.cartQuantity ?? 0),
        0
      );

      state.totalPrice = state.items.reduce(
        (sum, item) =>
          sum + (item.discountPrice ?? item.price) * (item.cartQuantity ?? 0),
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
