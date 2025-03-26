import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  // Define your table categories
  const tableCategories = [
    { name: 'Users', path: '/dashboard/users', icon: 'fa-users' },
    { name: 'Products', path: '/dashboard/products', icon: 'fa-box' },
    { name: 'Orders', path: '/dashboard/orders', icon: 'fa-shopping-cart' },
    { name: 'Analytics', path: '/dashboard/analytics', icon: 'fa-chart-line' }
  ];

  return (
    <Nav className="flex-column bg-light p-3" style={{ width: '250px' }}>
      {tableCategories.map((category) => (
        <Nav.Item key={category.path}>
          <Nav.Link
            as={Link}
            to={category.path}
            active={location.pathname.startsWith(category.path)}
            className="d-flex align-items-center"
          >
            <i className={`fas ${category.icon} me-2`}></i>
            {category.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default Sidebar;