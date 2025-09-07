import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      brand: "Apple",
      price: 1199.99,
      originalPrice: 1299.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      color: "Natural Titanium",
      storage: "256GB",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Wireless Headphones",
      brand: "Sony",
      price: 349.99,
      originalPrice: 399.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop",
      color: "Midnight Black",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 3,
      name: "MacBook Air M2 13-inch",
      brand: "Apple",
      price: 1099.99,
      originalPrice: 1199.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      color: "Space Gray",
      storage: "256GB SSD",
      rating: 4.7,
      inStock: false,
    },
  ],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += product.price;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          totalPrice: product.price,
        });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    updateQuantity: (state, action) => {
      const { productId, productPrice, quantity } = action.payload;
      console.log(productId, productPrice, quantity);
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += quantity;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== productId);
        }
      }

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity
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
