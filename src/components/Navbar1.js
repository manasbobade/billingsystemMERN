import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function Navbar1() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="warning" variant="light">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#contactus">Contact Us</Nav.Link>
            <Nav.Link href="#knowmore">Know more</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/sign-in"><Button variant="dark" size="lg">Login</Button></Nav.Link>
            <Nav.Link href="/sign-up"><Button variant="dark" size="lg">Sign-up</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;