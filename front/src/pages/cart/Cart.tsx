import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Book } from "../../redux/features/books/booksSlice";
import { CartItem } from "./cartItem/CartItem";
import { routes } from "../../routes";

export const Cart = () => {
  const cart = useAppSelector((state) => state.cart);

  const cartTotalValue: number = cart.reduce(
    (acc: number, obj: Book) => acc + obj.price,
    0
  );

  return (
    <Container className="mt-5 d-flex flex-column">
      {cart.length > 0 ? (
        <>
          <Row className="pt-4 justify-content-md-start justify-content-center">
            {cart?.map((book: Book) => {
              return <CartItem key={book.id} {...book} />;
            })}
          </Row>
          {cart.length > 0 && (
            <>
              <h5 className="ms-auto">{`Cart total value: ${cartTotalValue} PLN`}</h5>
              <hr />
              <Link className="ms-auto w-50" to={routes.order}>
                <Button className="mb-4 w-100">CONTINUE</Button>
              </Link>
            </>
          )}
        </>
      ) : (
        <Container className="d-flex justify-content-center mt-5 flex-column text-center">
          <h3 className="mb-4">Your cart is empty</h3>
          <Link to="/">
            <Button className="w-50">GO TO SHOP</Button>
          </Link>
        </Container>
      )}
    </Container>
  );
};
