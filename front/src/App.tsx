import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/navbar/Navbar";
import { Cart } from "./pages/cart/Cart";
import { Homepage } from "./pages/homepage/Homepage";
import { Order } from "./pages/order/Order";
import { getBooks } from "./redux/features/books/booksSlice";
import { useAppDispatch } from "./redux/hooks";
import { routes } from "./routes";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path={routes.homepage} element={<Homepage />} />
        <Route path={routes.order} element={<Order />} />
        <Route path={routes.cart} element={<Cart />} />
      </Routes>
    </>
  );
};

