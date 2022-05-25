import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../books/booksSlice";

export type CartState = Book[];

const initialState: CartState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addBookToCart: (state, action: PayloadAction<Book>) => {
      state.push(action.payload);
    },
    removeBookFromCart: (state, action: PayloadAction<number>) => {
      return state.filter(({ id }) => id !== action.payload);
    },
    clearCart() {
      return initialState;
    },
  },
});

export const { addBookToCart, removeBookFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

