import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Book as BookInterface } from "../../../../redux/features/books/booksSlice";
import { addBookToCart } from "../../../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

export const Book = (props: BookInterface) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>(false);

  useEffect(() => {
    const thisBookInCart = cart.some(
      (book: BookInterface) => book.id === props.id
    );
    setIsAlreadyInCart(thisBookInCart);
    if (isAlreadyInCart) {
      setIsButtonDisabled(true);
    }
  }, [cart, props.id, isAlreadyInCart]);

  const handleAddBookToCart = () => {
    dispatch(addBookToCart(props));
    toast.success(`You have successfully added ${props.title} to cart.`);
  };
  return (
    <Card className="m-2 p-0" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.cover_url} />
      <Card.Body className="d-flex flex-column gap-2">
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.author}</Card.Text>
        <Card.Text>{`Pages: ${props.pages}`}</Card.Text>
        <Card.Text>{`${props.price} ${props.currency} `}</Card.Text>
        <Button
          className="mt-auto"
          disabled={isButtonDisabled}
          variant="primary"
          onClick={handleAddBookToCart}
        >
          {isButtonDisabled ? "ALREADY ADDED" : "ADD TO CART"}
        </Button>
      </Card.Body>
    </Card>
  );
};
