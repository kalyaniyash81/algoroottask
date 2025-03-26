import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';

function OrdersTable() {
  const initialOrders = [
    { id: 1, customer: 'John Doe', total: '$50', status: 'Shipped' },
    { id: 2, customer: 'Jane Smith', total: '$75', status: 'Processing' },
    { id: 3, customer: 'Alice Johnson', total: '$120', status: 'Delivered' },
    { id: 4, customer: 'Bob Brown', total: '$200', status: 'Shipped' },
    { id: 5, customer: 'Charlie Green', total: '$85', status: 'Pending' },
    { id: 6, customer: 'David White', total: '$150', status: 'Delivered' },
    { id: 7, customer: 'Emma Wilson', total: '$95', status: 'Processing' },
    { id: 8, customer: 'Frank Black', total: '$220', status: 'Pending' },
    { id: 9, customer: 'Grace Hall', total: '$300', status: 'Shipped' },
    { id: 10, customer: 'Henry Adams', total: '$400', status: 'Delivered' }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSort = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.customer.localeCompare(b.customer);
      } else {
        return b.customer.localeCompare(a.customer);
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setOrders(sortedOrders);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <h2>Orders</h2>
      <Form.Control
        type="text"
        placeholder="Search customers..."
        onChange={handleSearch}
        className="mb-3"
      />
      <Button variant="primary" onClick={handleSort} className="mb-2">
        Sort by Customer ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-controls">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-3">Page {currentPage} of {totalPages}</span>
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default OrdersTable;