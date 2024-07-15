import {Container, Nav, Navbar} from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="#home" className="text-white">
          University Connect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link href="/students" className="text-white">
              Students
            </Nav.Link>
            <Nav.Link href="/events" className="text-white">
              Events
            </Nav.Link>
            <Nav.Link href="/resources" className="text-white">
              Resources
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
