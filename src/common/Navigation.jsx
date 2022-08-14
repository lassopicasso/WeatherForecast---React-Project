import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="text-uppercase">Weatherish</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} className="text-uppercase" to="/">
              Weather
            </Nav.Link>
            <Nav.Link as={NavLink} className="text-uppercase" to="/favorites">
              Favorites
            </Nav.Link>
            <Nav.Link as={NavLink} className="text-uppercase" to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
