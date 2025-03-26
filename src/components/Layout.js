import { Container } from 'react-bootstrap';
import Navbar from './Dashboard/Navbar';
import Sidebar from './Dashboard/Sidebar';

function Layout({ children }) {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <Container fluid className="p-3">
          {children}
        </Container>
      </div>
    </div>
  );
}

export default Layout;