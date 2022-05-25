import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Book } from "../../../redux/features/books/booksSlice";
import { removeBookFromCart } from "../../../redux/features/cart/cartSlice";

export const CartItem = (props: Book) => {
  const dispatch = useDispatch();

  const handleRemoveBookFromCart = () => {
    dispatch(removeBookFromCart(props.id));
    toast.success(`You have successfully removed ${props.title} from cart.`);
  };
  return (
    <Card className="p-0 m-3" style={{ width: "18rem" }}>
      <Card.Img src={props.cover_url} />
      <Card.Body className="d-flex flex-column gap-2">
        <Card.Title> {props.title}</Card.Title>
        <Card.Text>{props.author}</Card.Text>
        <Card.Text>{`${props.price} ${props.currency} `}</Card.Text>
        <Button
          className="mt-auto"
          onClick={handleRemoveBookFromCart}
          variant="danger"
        >
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
};

