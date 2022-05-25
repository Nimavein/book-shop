import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  pages: number;
  price: number;
  currency: string;
}

export interface BooksState {
  books: Book[] | undefined;
  status: string | null;
}

const initialState: BooksState = {
  books: [],
  status: null,
};

export const getBooks: any = createAsyncThunk("books/getBooks", async () => {
  const response = await axios("http://localhost:3001/api/books");
  return response.data.data;
});

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: {
    [getBooks.pending]: (state: BooksState, action: PayloadAction<Book[]>) => {
      state.status = "loading";
    },
    [getBooks.fulfilled]: (
      state: BooksState,
      action: PayloadAction<Book[]>
    ) => {
      state.books = action.payload;
      state.status = "success";
    },
    [getBooks.rejected]: (state: BooksState, action) => {
      state.status = action.error.message;
      toast.error(
        `There was an error while fetching books. ${action.error.message}`
      );
    },
  },
});

export default booksSlice.reducer;

