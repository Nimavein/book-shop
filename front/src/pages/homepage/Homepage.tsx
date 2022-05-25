import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import Books from "./books/Books";

export const Homepage: React.FC = () => {
  return (
    <Container className="mt-5">
      <Books />
      <hr />
      <div className="d-flex">
        <Link className="ms-auto w-50" to={routes.cart}>
          <Button className="mb-4 w-100">CONTINUE</Button>
        </Link>
      </div>
    </Container>
  );
};
