import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

function CustomNavbar() {
  const { user, logout, deleteAccount } = useAuth();

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Algo Root</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className="justify-content-end">
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-user">
                <i className="fas fa-user-circle me-2"></i>
                {user?.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.ItemText>
                  <small>Logged in as: {user?.email}</small>
                </Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </Dropdown.Item>
                <Dropdown.Item onClick={deleteAccount} className="text-danger">
                  <i className="fas fa-trash-alt me-2"></i>Delete Account
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;