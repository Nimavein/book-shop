import { Container } from "react-bootstrap";
import OrderForm from "./orderForm/OrderForm";

export const Order = () => {
  return (
    <Container className="mt-5 d-flex flex-column">
      <OrderForm />
    </Container>
  );
};
