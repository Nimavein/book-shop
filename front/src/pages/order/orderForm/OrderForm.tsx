import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Book } from "../../../redux/features/books/booksSlice";
import { toast } from "react-toastify";
import { clearCart } from "../../../redux/features/cart/cartSlice";

export interface NewOrder {
  order: Order[];
  first_name: string;
  last_name: string;
  city: string;
  zip_code: string;
}

export interface Order {
  id: number;
  quantity: number;
}

const OrderForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<NewOrder>();
  const [order, setOrder] = useState<Order[]>([]);
  const cart = useAppSelector((state) => state.cart);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
    useState<boolean>(false);

  useEffect(() => {
    const orderedItems: Order[] = cart.map((book: Book) => {
      return {
        id: book.id,
        quantity: 1,
      };
    });
    setOrder(orderedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let submitSuccessfulTimer = setTimeout(
      () => setIsSuccessfullySubmitted(false),
      3000
    );
    return () => {
      clearTimeout(submitSuccessfulTimer);
    };
  }, [isSuccessfullySubmitted]);

  const onFormSubmit = (data: NewOrder) => {
    if (cart?.length > 0) {
      try {
        axios.post("http://localhost:3001/api/order", {
          order: order,
          first_name: data.first_name,
          last_name: data.last_name,
          city: data.city,
          zip_code: data.zip_code,
        });
        toast.success("You have successfully bought chosen books.");
        setIsSuccessfullySubmitted(true);
        reset();
        dispatch(clearCart());
      } catch (error: any) {
        toast.error(`Could not send data: ${error.message}`);
      }
    } else {
      toast.warning(`Your cart is empty.`);
    }
  };

  return (
    <Form className="mt-5" onSubmit={handleSubmit(onFormSubmit)}>
      <h3 className="mb-3">Submit your order</h3>
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          {...register("first_name")}
          minLength={4}
          required
          name="first_name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your last name"
          {...register("last_name")}
          minLength={5}
          required
          name="last_name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your city name"
          {...register("city")}
          required
          name="city"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="zip_code">
        <Form.Label>ZIP</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter ZIP code"
          {...register("zip_code")}
          required
          name="zip_code"
          pattern="[0-9]{2}-[0-9]{3}"
        />
      </Form.Group>

      <Button
        variant={isSuccessfullySubmitted ? "success" : "primary"}
        type="submit"
      >
        {isSuccessfullySubmitted ? "ORDERED SUCCESSFULLY" : "ORDER AND PAY"}
      </Button>
    </Form>
  );
};

export default OrderForm;

