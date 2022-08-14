import React from "react";
import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navigation() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar bg="light" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand className="text-uppercase">Weatherish</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} className="text-uppercase" to="/" onClick={() => setExpanded(false)}>
              Weather
            </Nav.Link>
            <Nav.Link as={NavLink} className="text-uppercase" to="/favorites" onClick={() => setExpanded(false)}>
              Favorites
            </Nav.Link>
            <Nav.Link as={NavLink} className="text-uppercase" to="/contact" onClick={() => setExpanded(false)}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
