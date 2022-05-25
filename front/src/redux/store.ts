import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./features/books/booksSlice";
import cartSlice from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    books: booksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
