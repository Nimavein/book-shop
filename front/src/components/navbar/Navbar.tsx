import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export const Navbar = () => {
  return (
    <BootstrapNavbar className="fixed-top" bg="light" variant="light">
      <Container>
        <Nav className="me-auto">
          <Nav.Link>
            <Link
              style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.55)" }}
              to={routes.homepage}
            >
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.55)" }}
              to={routes.cart}
            >
              Cart
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};
