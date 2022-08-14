import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Favorites from "./components/Favorites/Favorites";

function App() {
  return (
    <>
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand className="text-uppercase">Weather Forecast</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} className="text-uppercase" to="/">
                  Home
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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
      <footer>
        <div>Lars Walderhaug</div>
      </footer>
    </>
  );
}

export default App;
